import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, retrieveTasks } from "../api/taskAPI";
import ToDo from "./ToDo";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();
    navigate('/');
  };
  const fetchTasks = async() => {
    const res = await retrieveTasks();
    setTasks(res.userTasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-1/2 bg-inherit p-4 border rounded-md">
      {Object.keys(user).length === 0 ? (
        <p className="text-lg text-gray-300">You are not signed in!</p>
      ) : (
        <div className="bg-inherit shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-white">Here are your tasks, {user.username}</h1>
            <button 
              onClick={logOut} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          <div className="space-y-4 overflow-scroll">
            {tasks.map((task, key) => (
              <ToDo key={key} task={task}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
