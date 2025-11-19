"use server";
import { prisma } from "@/database";
import { redirect } from "next/navigation";

export async function createBlock(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const block = await prisma.block.create({ data: { title, code } });
  redirect("/");
}

export async function updateBlock(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  
  await prisma.block.update({
    where: { id: parseInt(id) },
    data: { title, code },
  });
  // Redirect to the home page after update
  redirect("/");
}

export async function deleteBlock(id: number, formData: FormData) {
  
  // Perform the database deletion
  await prisma.block.delete({
    where: { id: Number(id) },
  });

  // Redirect home
  redirect("/");
}
