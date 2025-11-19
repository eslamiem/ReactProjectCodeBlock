import { prisma } from "@/database";
import { create } from "domain";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CreateBlock() {
  async function createBlock(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    console.log("Creating block with title:", title, "and code:", code);

    await prisma.block.create({
      data: {
        title: String(title),
        code: String(code),
      },
    });
    redirect("/");
  }
  return (
    <div>
      <Link href="/">Go back Home</Link>
      <form action={createBlock}>
        <div>
          <input name="title" type="text" placeholder="Block Title" />
        </div>
        <textarea name="code" placeholder="your code goes here..."></textarea>
        <button>Create</button>
      </form>
    </div>
  );
}
