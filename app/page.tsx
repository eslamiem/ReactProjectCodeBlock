import { prisma } from "@/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  console.log("User ID from cookie:", userId);
  if (!userId) {
    redirect("/login");
  }
  const blocks = await prisma.block.findMany({
    where: { userId: Number(userId) }  
  });
  console.log("Fetched blocks:", blocks)
  

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks</h1>
          <Link
            href="/blocks/create"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Block
          </Link>
        </header>

        {blocks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No blocks yet. Create one to get started!
          </p>
        ) : (
          <ul className="space-y-3">
            {blocks.map((block) => (
              <li
                key={block.id}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="text-gray-800 font-medium">
                  <Link href={`/blocks/${block.id}`}>{block.title}</Link>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
