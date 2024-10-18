import { useState } from "react"
import { createUser } from "../api/taskAPI";


export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    return <div className="border rounded-lg shadow-lg w-1/2 h-1/5 flex flex-col p-6">
    <h1 className="text-2xl font-bold mb-4 text-center text-white">Register as a User!</h1>
  
    <form className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Enter your username"
        className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        value={password}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        onClick={() => createUser(username, password)}
      >
        Register
      </button>
    </form>
  </div>
  
}