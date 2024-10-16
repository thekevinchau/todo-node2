import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import { addTaskApi, fetchTasks } from "../api/taskAPI";

export default function ToDoList() {
  const [ToDos, setToDos] = useState([]);
  const [task, setTask] = useState("");

  const retrieveTasks = async() => {
    const tasks = await fetchTasks();
    setToDos(tasks);
  }

  const addTask = async(e) => {
    e.preventDefault();
    await addTaskApi(task);
    setTask("");
    await retrieveTasks();
  }
  
  useEffect(() => {
    retrieveTasks();
  }, []);

  function renderToDos2(toDos) {
    return toDos.map((task, id) => (
      <ToDo name={task.task_name} id={task._id} key={id} fetchTasks={retrieveTasks} />
    ));
  }
  return (
    <div className=" w-1/2 h-1/2 bg-gray-800 text-white rounded-lg shadow-lg p-6">
      <h1 className=" text-center font-bold text-2xl mb-4 pb-2">
        ToDo MERN Stack
      </h1>

      <div className="flex mb-4">
        <input
          placeholder="Add a task!"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            console.log(task);
          }}
          className="flex-grow border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
        <button
          disabled={task.trim().length === 0}
          onClick={addTask}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
        >
          Add
        </button>
      </div>

      <div className="overflow-y-auto h-2/3 border rounded-md p-2">
        {ToDos.length > 0 ? (
          renderToDos2(ToDos)
        ) : (
          <p className="text-center text-gray-400">No ToDos Found</p>
        )}
      </div>
    </div>
  );
}
