

export const createUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
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
  try{
    const response = await fetch(`http://localhost:3000/api/login`,
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
    return data;

  }catch(err){
    console.error('Error logging in user', err);
  }
}


/*

*/
export const retrieveTasks = async() => {
  try{
    const response = await fetch ('http://localhost:3000/api/tasks', {
      method: "GET",
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  }catch(err){
    console.error('Error retrieving tasks!', err)
  }
}
