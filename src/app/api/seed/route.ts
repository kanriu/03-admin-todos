import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Gema del alma", complete: true },
          { description: "Gema del poder" },
          { description: "Gema del tiempo" },
          { description: "Gema del espacio" },
          { description: "Gema del realidad" },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed Executed" });
}
