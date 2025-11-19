import { prisma } from "@/database";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };
export default async function ShowBlock({ params }: Props) {
  const { id } = await params;
  const block = await prisma.block.findUnique({
    where: { id: Number(id) },
  });
  if (!block) return notFound();
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1>Tis is block number: {id}</h1>
        <h1>The block title is: {block.title}</h1>
      </div>
    </main>
  );
}
