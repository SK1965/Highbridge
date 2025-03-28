export const saveWorkflows = (workflows) => {
    localStorage.setItem('workflows', JSON.stringify(workflows));
  };
  
  export const loadWorkflows = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('workflows');
      return data ? JSON.parse(data) : [];
    }
    return [];
  };
  
  export const getWorkflowById = (id) => {
    const workflows = loadWorkflows();
    return workflows.find(w => w.id === id);
  };
  
  export const updateWorkflow = (updated) => {
    const workflows = loadWorkflows();
    const index = workflows.findIndex(w => w.id === updated.id);
    if (index !== -1) {
      workflows[index] = updated;
      saveWorkflows(workflows);
    }
  };
  