/* eslint-disable react/prop-types */

import { deleteTaskAPI } from "../api/taskAPI";

export default function ToDo(props) {

  const deleteTask = async(taskId) => {
    await deleteTaskAPI(taskId);
    props.fetchTasks();
  }

  return (
    <div className="flex justify-between items-center bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg mb-2 transition duration-200 hover:bg-gray-800">
      <span className="text-lg font-semibold text-gray-200">{props.name}</span>
      <button className="bg-red-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-500 transition" onClick={() => deleteTask(props.id)}>
        Delete
      </button>
    </div>
  );
}
