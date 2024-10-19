/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateTaskName } from "../api/taskAPI";

export default function EditModal(props) {
  const [newTaskName, setNewTaskName] = useState("");
  return (
    <div className="text-white w-full h-1/4 border bg-blue-300 flex justify-between p-2">
      <input
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder={props.task.task_name}
        className="bg-inherit border border-black rounded-md text-black pl-1"
      ></input>
      <button className="text-black" onClick={() => updateTaskName(props.task._id, newTaskName)}>Apply changes</button>
    </div>
  );
}
