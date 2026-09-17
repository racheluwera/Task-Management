"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle, faChartPie, faBolt, faCheckCircle, faTrashAlt,
  faTasks, faEdit, faCircle, faTimes, faPlus, faCheck, faClipboardList,
  faSearch, faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

type Priority = "low" | "medium" | "high";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  status: "pending" | "completed";
  priority: Priority;
  createdAt: string;
};

const PRIORITY_STYLES: Record<Priority, { label: string; badge: string }> = {
  low:    { label: "Low",    badge: "bg-green-100 text-green-700"   },
  medium: { label: "Medium", badge: "bg-yellow-100 text-yellow-700" },
  high:   { label: "High",   badge: "bg-red-100 text-red-700"       },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
}

const EMPTY_FORM = { title: "", description: "", dueDate: "", priority: "medium" as Priority };

export default function Dashboard() {
  const [tasks, setTasks]               = useState<Task[]>([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sort, setSort]                 = useState("default");
  const [search, setSearch]             = useState("");
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [errors, setErrors]             = useState<{ title?: string; description?: string }>({});
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [editModal, setEditModal]       = useState(false);
  const [editId, setEditId]             = useState<number | null>(null);
  const [editForm, setEditForm]         = useState(EMPTY_FORM);

  const today = new Date().toISOString().split("T")[0];

  const fetchTasks = useCallback(async () => {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  function validate(f: typeof EMPTY_FORM) {
    const e: { title?: string; description?: string } = {};
    if (!f.title.trim())       e.title       = "Title is required";
    if (!f.description.trim()) e.description = "Description is required";
    return e;
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(EMPTY_FORM);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
    fetchTasks();
  }

  async function toggleStatus(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: task.status === "completed" ? "pending" : "completed" }),
    });
    fetchTasks();
  }

  async function deleteTask(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  function openEdit(task: Task) {
    setEditId(task.id);
    setEditForm({ title: task.title, description: task.description, dueDate: task.dueDate || "", priority: task.priority });
    setErrors({});
    setEditModal(true);
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(editForm);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await fetch(`/api/tasks/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditModal(false);
    fetchTasks();
  }

  async function markAllComplete() {
    await Promise.all(
      tasks.filter(t => t.status !== "completed").map(t =>
        fetch(`/api/tasks/${t.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "completed" }),
        })
      )
    );
    fetchTasks();
  }

  async function clearCompleted() {
    if (!confirm("Are you sure you want to delete all completed tasks?")) return;
    await Promise.all(
      tasks.filter(t => t.status === "completed").map(t =>
        fetch(`/api/tasks/${t.id}`, { method: "DELETE" })
      )
    );
    fetchTasks();
  }

  const total     = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending   = tasks.filter(t => t.status === "pending").length;
  const overdue   = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed").length;

  let filtered = [...tasks];
  if (filter === "pending")   filtered = filtered.filter(t => t.status === "pending");
  if (filter === "completed") filtered = filtered.filter(t => t.status === "completed");
  if (priorityFilter !== "all") filtered = filtered.filter(t => t.priority === priorityFilter);
  if (search.trim()) filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "date") filtered.sort((a, b) => !a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  if (sort === "name") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "priority") {
    const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  const inputCls  = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
  const selectCls = "p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Task Management Dashboard</h1>
          <p className="text-lg text-gray-500">Manage your tasks efficiently and boost productivity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-1 space-y-8">

            {/* Add Task Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faPlusCircle} className="text-indigo-500 mr-2" /> Add New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter task title" className={inputCls} />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the task..." className={`${inputCls} resize-none`} />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Priority })} className={inputCls}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input type="date" value={form.dueDate} min={today} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={inputCls} />
                </div>
                <button type="submit"
                  className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center text-white ${addedSuccess ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                  <FontAwesomeIcon icon={addedSuccess ? faCheck : faPlus} className="mr-2" />
                  {addedSuccess ? "Task Added!" : "Add Task"}
                </button>
              </form>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faChartPie} className="text-indigo-500 mr-2" /> Task Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{total}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">{pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{overdue}</p>
                  <p className="text-sm text-gray-600">Overdue</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faBolt} className="text-indigo-500 mr-2" /> Quick Actions
              </h2>
              <div className="space-y-3">
                <button onClick={markAllComplete} className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-medium hover:bg-green-200 transition flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Mark All Complete
                </button>
                <button onClick={clearCompleted} className="w-full bg-red-100 text-red-700 py-2 rounded-lg font-medium hover:bg-red-200 transition flex items-center justify-center">
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Clear Completed
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faTasks} className="text-indigo-500 mr-2" /> Your Tasks
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className={selectCls}>
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Priority:</label>
                    <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className={selectCls}>
                      <option value="all">All</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort:</label>
                    <select value={sort} onChange={e => setSort(e.target.value)} className={selectCls}>
                      <option value="default">Default</option>
                      <option value="date">Due Date</option>
                      <option value="name">Title</option>
                      <option value="priority">Priority</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search tasks by title or description..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {loading ? (
                <div className="text-center py-10 text-gray-400">Loading tasks...</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon icon={faClipboardList} className="text-5xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500">No tasks found</h3>
                  <p className="text-gray-400 mt-2">Try adjusting your filters or add a new task</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(task => {
                    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
                    const p = PRIORITY_STYLES[task.priority];
                    return (
                      <div key={task.id} className={`border border-gray-200 rounded-xl p-4 ${task.status === "completed" ? "bg-green-50" : "bg-white"}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start space-x-3 flex-1 min-w-0">
                            <button onClick={() => toggleStatus(task)} className={`mt-1 shrink-0 ${task.status === "completed" ? "text-green-600" : "text-gray-400"}`}>
                              <FontAwesomeIcon icon={task.status === "completed" ? faCheckCircle : faCircle} className="text-lg" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-semibold ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"}`}>
                                  {task.title}
                                </h3>
                                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${p.badge}`}>
                                  <FontAwesomeIcon icon={faFlag} className="text-[10px]" /> {p.label}
                                </span>
                              </div>
                              {task.description && (
                                <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
                              )}
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                {task.dueDate && (
                                  <div className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-500" : "text-gray-400"}`}>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <span>Due: {formatDate(task.dueDate)}</span>
                                    {isOverdue && <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Overdue</span>}
                                  </div>
                                )}
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <span>Created: {formatDate(task.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 shrink-0">
                            <button onClick={() => openEdit(task)} className="text-blue-500 hover:text-blue-700 transition p-1">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition p-1">
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Task</h3>
              <button onClick={() => setEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputCls} />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea rows={3} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  className={`${inputCls} resize-none`} />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select value={editForm.priority} onChange={e => setEditForm({ ...editForm, priority: e.target.value as Priority })} className={inputCls}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" value={editForm.dueDate} min={today} onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })} className={inputCls} />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
