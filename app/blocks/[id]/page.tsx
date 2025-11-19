import Link from "next/link";
import { prisma } from "@/database";
import { notFound } from "next/navigation";
import { deleteBlock } from "@/app/api"; 


export default async function ShowBlock({ params }: { params: { id: string } }) {
  const { id } = await params;
  const block = await prisma.block.findUnique({
    where: { id: Number(id) },
  });
  if (!block) return notFound();

  const deleteAction = deleteBlock.bind(null, block.id);

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-50 min-h-screen">
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out inline-block mb-8 text-sm font-medium"
      >
        &larr; Go back Home
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Block Details</h1>
        
        <div className="flex gap-3">
          <Link
            href={`/blocks/${block.id}/edit`}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Edit
          </Link>

          <form action={deleteAction}>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 border border-gray-200">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Block Title
          </label>
          <input
            type="text"
            defaultValue={block.title}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none cursor-default"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code Snippet
          </label>
          <textarea
            defaultValue={block.code}
            readOnly
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-800 font-mono text-sm resize-none focus:outline-none cursor-default"
          ></textarea>
        </div>

      </div>
    </div>
  );
}