'use client'

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkflowById, updateWorkflow } from "@/utils/storage";

export default function WorkflowPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [workflow, setWorkflow] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const wf = getWorkflowById(id);
      setWorkflow(wf);
    }
  }, [id]);

  const addNode = () => {
    if (!workflow) return;
    const newNode = { id: Date.now().toString(), label: "New Node" };
    const updated = { ...workflow, nodes: [...workflow.nodes, newNode] };
    setWorkflow(updated);
    updateWorkflow(updated);
  };

  const updateNodeLabel = (id: string, label: string) => {
    if (!workflow) return;
    const updatedNodes = workflow.nodes.map((node: any) =>
      node.id === id ? { ...node, label } : node
    );
    const updated = { ...workflow, nodes: updatedNodes };
    setWorkflow(updated);
    updateWorkflow(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission or adding node
      (e.target as HTMLInputElement).blur(); // optional: removes focus to show user that editing is done
    }
  };

  const deleteNode = (id: string) => {
    if (!workflow) return;
    const updatedNodes = workflow.nodes.filter((node: any) => node.id !== id);
    const updated = { ...workflow, nodes: updatedNodes };
    setWorkflow(updated);
    updateWorkflow(updated);
  };

  if (!workflow) return <div>Loading...</div>;

  return (
    <div className="p-6 cursor-pointer">
      <button onClick={() => router.push('/')} className="mb-4 bg-gray-200 px-3 py-1 rounded">← Go Back</button>
      <h2 className="text-xl font-bold mb-4">{workflow.name}</h2>

      <div className="border p-4 rounded min-h-[300px] bg-gray-50 flex flex-col space-y-4 items-center">

        {/* Start */}
        <div className="bg-green-400 text-white text-center py-2 px-4 rounded-full w-24">Start</div>

        {/* Nodes with Arrows */}
        {workflow.nodes.map((node: any) => (
          <div key={node.id} className="flex flex-col items-center space-y-2">

            {/* Arrow */}
            <div className="text-gray-400 text-2xl">↓</div>

            {/* Node */}
            <div className="bg-white border p-2 rounded flex items-center space-x-2">
              <input
                value={node.label}
                onChange={(e) => updateNodeLabel(node.id, e.target.value)}
                onKeyDown={handleKeyDown}
                className="border rounded px-2 py-1"
              />
              <button onClick={() => deleteNode(node.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}

        {/* Arrow before + */}
        <div className="text-gray-400 text-2xl">↓</div>

        {/* + Button */}
        <button
          onClick={addNode}
          className="mt-2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg hover:bg-blue-600"
        >
          +
        </button>

        {/* Arrow before End */}
        <div className="text-gray-400 text-2xl">↓</div>

        {/* End */}
        <div className="bg-red-400 text-white text-center py-2 px-4 rounded-full w-24">End</div>
      </div>

    </div>
  );
}
