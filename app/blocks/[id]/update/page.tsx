import { prisma } from "@/database";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateBlock } from "@/app/api"; 

type Props = { 
    params: { id: string } 
};

export default async function UpdateBlock({ params }: Props) {
  const { id } = params; 

  // 1. Fetch the existing block data
  const block = await prisma.block.findUnique({
    where: { id: Number(id) }, 
  });
  
  if (!block) {
    return notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-50 min-h-screen">
      
      <Link href={`/blocks/${id}`} className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out inline-block mb-8 text-sm font-medium">
        &larr; Cancel and Go Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Block: {block.title}</h1>

      <form action={updateBlock} className="bg-white p-6 rounded-lg shadow-xl space-y-4 border border-gray-200">
        
        <input type="hidden" name="id" value={block.id} />
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Block Title</label>
          <input 
            id="title"
            name="title"
            type="text" 
            placeholder="A descriptive name for your code block" 
            required
            defaultValue={block.title} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Code Snippet</label>
          <textarea 
            id="code"
            name="code" 
            placeholder="your code goes here..."
            rows={10} 
            required
            defaultValue={block.code} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-y"
          ></textarea>
        </div>
        
        <div className="pt-2">
            <button 
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
                Update Block
            </button>
        </div>
      </form>
    </div>
  );
}