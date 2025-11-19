import Link from "next/link";
import { editBlock } from "@/app/api"; 
import { prisma } from "@/database";
import { notFound } from "next/navigation";

async function getBlock(blockId: number) {
  if (isNaN(blockId)) return null;

  const block = await prisma.block.findUnique({ 
    where: { 
      id: blockId 
    } 
  });
  
  return block;
}

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlockPage({ params }: EditPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  const block = await getBlock(numericId);

  if (!block) {
    return notFound();
  }
  
  const updateAction = editBlock.bind(null, block.id);

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-50 min-h-screen">
      <Link 
        href={`/blocks/${id}`} 
        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out inline-block mb-8 text-sm font-medium"
      >
        &larr; Cancel and Go Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Block</h1>

      <form action={updateAction} className="bg-white p-6 rounded-lg shadow-xl space-y-4 border border-gray-200">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Block Title
          </label>
          <input 
            id="title"
            name="title"
            type="text" 
            defaultValue={block.title}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Code Snippet
          </label>
          <textarea 
            id="code"
            name="code" 
            defaultValue={block.code}
            rows={10} 
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-y"
          ></textarea>
        </div>
        
        <div className="pt-2 flex gap-3">
            <button 
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
}