import { useState } from "react";
import { createUser } from "../api/taskAPI";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try{
      if (username.includes(' ')){
        setMessageStatus('Username cannot contain spaces!');
        setTimeout(() => {
          setMessageStatus('')
        },3000)
        return;
      }
      if (password.includes(' ')){
        setMessageStatus('Password cannot contain spaces!');
        setTimeout(() => {
          setMessageStatus('')
        },3000)
        return;
      }
      else{
        await createUser(username, password);
        navigate('/');
        return;
      }

    }catch(err){
      console.error('Error creating user!', err)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border rounded-lg shadow-lg w-full max-w-sm p-8 bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white bg-inherit">Register as a User!</h1>
  
        <form className="flex flex-col w-full bg-inherit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            className="mb-4 w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white transition duration-200"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-6 w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white transition duration-200"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          { messageStatus !== '' ? <p className="bg-inherit text-white">{messageStatus}</p>: null} 
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={username === "" || password === ""}
          >
            Register
          </button>
          <a className="text-white bg-inherit" href="/">Already a user?</a>
        </form>
      </div>
    </div>
  );
}
