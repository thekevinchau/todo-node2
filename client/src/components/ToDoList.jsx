import { useEffect, useState } from "react";
import ToDo from "./ToDo";

export default function ToDoList() {
  const [ToDos, setToDos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:3001/api/tasks");
      const res_data = await res.json();
      setToDos(res_data);
    };
    fetchTasks();
  }, [ToDos]);


  const addTask = async(e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/tasks',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task_name: task
        })
      }
    );
    setTask("")

  }

  function renderToDos2(toDos) {
    return toDos.map((task, id) => <ToDo name={task.task_name} id={task._id} key={id} />);
  }
  return (
    <div className="border border-red-500 w-1/2 h-1/2 text-white">
      <h1 className="border border-red-500 h-1/5 flex items-center justify-center font-bold">
        ToDo MERN Stack
      </h1>

      <div>
        <input
          placeholder="Add a task!"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            console.log(task);
          }}
        ></input>
        <button disabled={task.trim().length === 0} onClick={addTask}>Add</button>
      </div>

      {ToDos.length > 0 ? renderToDos2(ToDos) : "No ToDos Found"}
    </div>
  );
}
