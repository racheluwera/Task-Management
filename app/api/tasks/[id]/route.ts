import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  const data = await req.json();
  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(data.title       !== undefined && { title: data.title.trim() }),
      ...(data.description !== undefined && { description: data.description.trim() }),
      ...(data.priority    !== undefined && { priority: data.priority }),
      ...(data.dueDate     !== undefined && { dueDate: data.dueDate || null }),
      ...(data.status      !== undefined && { status: data.status }),
    },
  });
  return NextResponse.json(task);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
