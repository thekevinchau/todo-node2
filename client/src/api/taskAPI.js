

export const createUser = async (username, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // You may want to return the response data
  } catch (err) {
    console.error('Error creating user', err);
  }
};


/*
Simple post request to the backend that will generate a cookie on the request for the user.
*/
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
        credentials: 'include'

      }
    )

    const data = await response.json();
    localStorage.setItem('token', data.token)
    return data;

  } catch (err) {
    console.error('Error logging in user', err);
  }
}

export const retrieveTasks = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error retrieving tasks!', err)
  }
}

export const logout = async () => {
  try {
    localStorage.removeItem('token');
  } catch (err) {
    console.error('Error logging out!', err)
  }
}


export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/delete`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`

      },
      body: JSON.stringify({
        task_id: taskId
      })
    });
    location.reload();
    return response;

  } catch (err) {
    console.error('Error deleting task!', err);
  }
}

export const addTask = async (taskName) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/addTask`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        task_name: taskName
      })
    })
    location.reload();
    return response;
  } catch (err) {
    console.error('Error adding a task!', err);
  }
}

export const toggleCompletion = async (taskId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/changeCompletion`,
      {
        method: "PUT",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          task_id: taskId
        })
      }
    )
    location.reload();
    return response;
  } catch (err) {
    console.error('Error toggling task completion!', err)
  }
}

export const updateTaskName = async (taskId, taskName) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/updateTaskName`,
      {
        method: "PUT",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          task_id: taskId,
          new_task_name: taskName
        })
      }
    );
    location.reload();
    return response;

  } catch (err) {
    console.error('Error updating task name', err)
  }
}