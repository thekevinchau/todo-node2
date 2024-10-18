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
