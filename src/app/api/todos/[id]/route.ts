import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (todo?.userId === session.user.id) {
    return null;
  }
  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo)
    return NextResponse.json(
      { message: `Todo con id ${id} no existe` },
      { status: 404 }
    );
  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo)
    return NextResponse.json(
      { message: `Todo con id ${id} no existe` },
      { status: 404 }
    );

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
