"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle, faChartPie, faBolt, faCheckCircle, faTrashAlt,
  faTasks, faEdit, faCircle, faTimes, faPlus, faCheck, faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

type Task = {
  id: number;
  name: string;
  dueDate: string | null;
  status: "pending" | "completed";
};

const SAMPLE_TASKS: Task[] = [
  { id: 1, name: "Complete project proposal", dueDate: "2023-12-15", status: "pending" },
  { id: 2, name: "Prepare presentation slides", dueDate: "2023-12-10", status: "pending" },
  { id: 3, name: "Review team assignments", dueDate: "2023-12-05", status: "completed" },
  { id: 4, name: "Schedule client meeting", dueDate: "2023-12-12", status: "pending" },
  { id: 5, name: "Update project documentation", dueDate: "2023-12-20", status: "pending" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [nameError, setNameError] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    setTasks(stored ? JSON.parse(stored) : SAMPLE_TASKS);
  }, []);

  function saveTasks(updated: Task[]) {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!taskName.trim()) { setNameError(true); return; }
    setNameError(false);
    const newTask: Task = { id: Date.now(), name: taskName.trim(), dueDate: dueDate || null, status: "pending" };
    saveTasks([...tasks, newTask]);
    setTaskName("");
    setDueDate("");
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  }

  function toggleStatus(id: number) {
    saveTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t));
  }

  function deleteTask(id: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      saveTasks(tasks.filter(t => t.id !== id));
    }
  }

  function openEdit(id: number) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setEditId(id);
    setEditName(task.name);
    setEditDate(task.dueDate || "");
    setEditModal(true);
  }

  function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    saveTasks(tasks.map(t => t.id === editId ? { ...t, name: editName, dueDate: editDate || null } : t));
    setEditModal(false);
  }

  function markAllComplete() {
    saveTasks(tasks.map(t => ({ ...t, status: "completed" })));
  }

  function clearCompleted() {
    if (confirm("Are you sure you want to delete all completed tasks?")) {
      saveTasks(tasks.filter(t => t.status !== "completed"));
    }
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed").length;

  let filtered = [...tasks];
  if (filter === "pending") filtered = filtered.filter(t => t.status === "pending");
  if (filter === "completed") filtered = filtered.filter(t => t.status === "completed");
  if (sort === "date") filtered.sort((a, b) => !a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Task Management Dashboard</h1>
          <p className="text-lg text-gray-500">Manage your tasks efficiently and boost productivity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Add Task Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faPlusCircle} className="text-indigo-500 mr-2" /> Add New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                  <input
                    type="text" value={taskName} onChange={e => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {nameError && <p className="text-red-500 text-sm mt-1">Task name is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date" value={dueDate} min={today} onChange={e => setDueDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center text-white ${addedSuccess ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
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

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faTasks} className="text-indigo-500 mr-2" /> Your Tasks
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 mr-2">Filter:</label>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                      <option value="all">All Tasks</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                      <option value="default">Default</option>
                      <option value="date">Due Date</option>
                      <option value="name">Task Name</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {filtered.length === 0 ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon icon={faClipboardList} className="text-5xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500">No tasks yet</h3>
                  <p className="text-gray-400 mt-2">Add a task using the form to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(task => {
                    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
                    return (
                      <div key={task.id} className={`border border-gray-200 rounded-xl p-4 ${task.status === "completed" ? "bg-green-50" : "bg-white"}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <button onClick={() => toggleStatus(task.id)} className={`mt-1 ${task.status === "completed" ? "text-green-600" : "text-gray-400"}`}>
                              <FontAwesomeIcon icon={task.status === "completed" ? faCheckCircle : faCircle} className="text-lg" />
                            </button>
                            <div className="flex-1">
                              <h3 className={`font-medium ${task.status === "completed" ? "text-gray-500" : "text-gray-800"}`}>{task.name}</h3>
                              {task.dueDate && (
                                <div className={`flex items-center mt-1 ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
                                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-sm" />
                                  <span className="text-sm">{formatDate(task.dueDate)}</span>
                                  {isOverdue && <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">Overdue</span>}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-2">
                            <button onClick={() => openEdit(task.id)} className="text-blue-500 hover:text-blue-700 transition">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition">
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

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Task</h3>
              <button onClick={() => setEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text" value={editName} onChange={e => setEditName(e.target.value)} required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date" value={editDate} min={today} onChange={e => setEditDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
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
