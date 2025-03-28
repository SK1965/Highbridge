export interface Node {
  id: string;
  label: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: Node[];
}

// Save workflows to localStorage
export const saveWorkflows = (workflows: Workflow[]): void => {
  localStorage.setItem('workflows', JSON.stringify(workflows));
};

// Load workflows from localStorage
export const loadWorkflows = (): Workflow[] => {
  if (typeof window !== 'undefined') {
      const data = localStorage.getItem('workflows');
      return data ? JSON.parse(data) as Workflow[] : [];
  }
  return [];
};

// Get workflow by id
export const getWorkflowById = (id: string): Workflow | undefined => {
  const workflows = loadWorkflows();
  return workflows.find((w) => w.id === id);
};

// Update workflow
export const updateWorkflow = (updated: Workflow): void => {
  const workflows = loadWorkflows();
  const index = workflows.findIndex((w) => w.id === updated.id);
  if (index !== -1) {
      workflows[index] = updated;
      saveWorkflows(workflows);
  }
};
