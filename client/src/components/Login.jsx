import { useState, useEffect } from "react";
import { loginUser } from "../api/taskAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const login = async () => {
    const response = await loginUser(username, password);

    if (response && response.status === "success") {
      setIsLoggedIn(true);
      setUser(response);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tasks', { state: { user: user } });
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border rounded-lg shadow-lg w-full max-w-sm p-8 bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white bg-inherit">Login</h1>

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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={login}
          disabled={username === "" || password == ""}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
