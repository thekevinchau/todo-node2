import { deleteTask, toggleCompletion } from "../api/taskAPI";
import { useState } from "react";
import EditModal from "./EditModal";
/* eslint-disable react/prop-types */
export default function ToDo(props) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const buttonCompletionStyle =
    props.task.completed === true
      ? "bg-green-500 rounded-md p-1"
      : "bg-red-500 rounded-md p-1";

  return (
    <div>
      <div className="border shadow-md rounded-lg p-4 mb-2 text-white flex justify-between h-1/2">
        <h1 className="text-xl font-semibold overflow-x-auto max-w-48">
          {props.task.task_name}
        </h1>
        <div>
          <button
            className={buttonCompletionStyle}
            onClick={() => toggleCompletion(props.task._id)}
          >
            {props.task.completed ? "DONE" : "IN PROG."}
          </button>
          <button
            className="ml-2"
            onClick={() => setModalVisibility(!modalVisibility)}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(props.task._id)} className="ml-2">
            X
          </button>
        </div>
      </div>
      {modalVisibility && <EditModal task={props.task} />}
    </div>
  );
}
