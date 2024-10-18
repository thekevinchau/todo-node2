import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addTask, logout, retrieveTasks } from "../api/taskAPI";
import ToDo from "./ToDo";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();
    navigate("/");
  };
  const fetchTasks = async () => {
    const res = await retrieveTasks();
    setTasks(res.userTasks);
  };

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
            <h1 className="text-2xl font-semibold text-white">
              Here are your tasks, {user.username}
            </h1>
            <button
              onClick={logOut}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          <div className="space-y-4 overflow-scroll">
            <input
              type="text"
              placeholder="Add a new task!"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => addTask(taskName)} disabled={taskName === ""}>
              Add
            </button>
            {tasks.map((task, key) => (
              <ToDo key={key} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
