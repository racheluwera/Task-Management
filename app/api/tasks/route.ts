import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title, description, priority, dueDate } = await req.json();
  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }
  const task = await prisma.task.create({
    data: { title: title.trim(), description: description.trim(), priority: priority ?? "medium", dueDate: dueDate || null },
  });
  return NextResponse.json(task, { status: 201 });
}
