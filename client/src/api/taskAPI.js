export const fetchTasks = async () => {
  const res = await fetch("http://localhost:3001/api/tasks");
  const res_data = await res.json();
  return res_data;
}


export const addTask = async (taskName) => {
  await fetch('http://localhost:3001/api/tasks',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task_name: taskName
      })
    }
  );
}