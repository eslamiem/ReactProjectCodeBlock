import { createBlock } from "@/app/api"; 
import Link from "next/link";

export default function CreateBlock() {
  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-50 min-h-screen">
      
      <Link href="/" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out inline-block mb-8 text-sm font-medium">
        &larr; Go back Home
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Block</h1>

      <form action={createBlock} className="bg-white p-6 rounded-lg shadow-xl space-y-4 border border-gray-200">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Block Title</label>
          <input 
            id="title"
            name="title"
            type="text" 
            placeholder="A descriptive name for your code block" 
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-y"
          ></textarea>
        </div>
        
        <div className="pt-2">
            <button 
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
                Create Block
            </button>
        </div>
      </form>
    </div>
  );
}