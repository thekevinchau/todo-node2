export const fetchTasks = async () => {

  try{
    const res = await fetch("http://localhost:3001/api/tasks");
    const res_data = await res.json();
    return res_data;
  }
  catch(err){
    console.error('Error fetching tasks from the database', err);
    throw new Error(err);
  }

}

export const addTaskApi = async (taskName) => {

  try{
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
  catch(err){
    console.error('Error fetching tasks from the database', err);
    throw new Error(err);
  }
  
}


export const deleteTaskAPI = async(taskId) => {
  try{
    await fetch(`http://localhost:3001/api/delete?task_id=${taskId}`,
      {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Success in deleting the task!')
  }
  catch(err){
    console.error('Error fetching tasks from the database', err);
    throw new Error(err);
  }
}