"use server";
import { prisma } from "@/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createBlock(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  // Create the new block in the database
  const _cookies = (await cookies()) as unknown as any;
  const userId = Number(_cookies.get("user_id")?.value);
  if (!userId) {
    redirect("/login");
  }
  const block = await prisma.block.create({ data: { title, code, userId } });
  redirect("/");
}

export async function editBlock(id: number, formData: FormData) {
const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  await prisma.block.update({
    where: { id },
    data: {
      title,
      code,
    },
  });

  redirect(`/blocks/${id}`);
}

export async function deleteBlock(id: number, formData: FormData) {
  
  // Perform the database deletion
  await prisma.block.delete({
    where: { id: Number(id) },
  });

  // Redirect home
  redirect("/");
}

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  try {
    const foundUser = await prisma.user.findUnique({
      where: { username, password },
    });
    if (!foundUser) {
      redirect("/login?error=Invalid Credentials"); // Added generic error param
    } else {
      (await cookies()).set("user_id", String(foundUser.id));
      redirect("/"); 
    }
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
        throw error;
    }
    console.error("Login error:", error);
    redirect("/login?error=Login Failed"); 
  }
}

export async function handleLogout() {
  // Delete the 'user_id' cookie
  (await cookies()).delete("user_id");

  // Redirect the user to the login page
  redirect("/login");
}