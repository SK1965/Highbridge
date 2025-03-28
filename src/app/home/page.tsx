'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadWorkflows, saveWorkflows } from "@/utils/storage";

// Define a type for the workflow
interface Workflow {
  id: string;
  name: string;
  nodes: { id: string; label: string }[]; // Assuming nodes have an ID and a label
}

export default function Home() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]); // Specify type here
  const router = useRouter();

  useEffect(() => {
    const workflows = loadWorkflows();
    setWorkflows(workflows);
  }, []);

  const createWorkflow = () => {
    const newWorkflow: Workflow = { 
      id: Date.now().toString(), 
      name: `Workflow ${workflows.length + 1}`, 
      nodes: [] 
    };
    const updated = [...workflows, newWorkflow];
    saveWorkflows(updated);
    setWorkflows(updated);
    router.push(`/workflow/${newWorkflow.id}`);
  };

  const deleteWorkflow = (id: string) => {
    const updated = workflows.filter(wf => wf.id !== id);
    saveWorkflows(updated);
    setWorkflows(updated);
  };

  const editWorkflowName = (id: string) => {
    const newName = prompt("Enter new workflow name:");
    if (!newName) return;
    const updated = workflows.map(wf => wf.id === id ? { ...wf, name: newName } : wf);
    saveWorkflows(updated);
    setWorkflows(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Workflow Creator</h1>
      <button onClick={createWorkflow} className="bg-green-500 text-white px-4 py-2 rounded">Create Workflow</button>

      <table className="mt-6 w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((wf) => (
            <tr key={wf.id} className="border">
              <td className="p-2 border">{wf.id}</td>
              <td className="p-2 border">{wf.name}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/workflow/${wf.id}`)} className="text-blue-500">Open</button>
                <button onClick={() => editWorkflowName(wf.id)} className="text-yellow-500">Edit</button>
                <button onClick={() => deleteWorkflow(wf.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
