import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { retrieveTasks } from "../api/taskAPI";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const user = location.state.user || {};

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await retrieveTasks();
      setTasks(res.userTasks);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      {!user ? (
        <p>You are not signed in!</p>
      ) : (
        <div className="text-white">
          <h1>Here are your tasks {user.username}</h1>
          {tasks.map((task, key) => (
            <p key={key}>{task.task_name}</p>
          ))}
        </div>
      )}
    </div>
  );
}
