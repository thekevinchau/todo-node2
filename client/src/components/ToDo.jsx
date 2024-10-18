import { deleteTask } from "../api/taskAPI";

/* eslint-disable react/prop-types */
export default function ToDo(props) {
    return (
        <div className="border shadow-md rounded-lg p-4 mb-4 text-white flex justify-between">
            <h1 className="text-xl font-semibold">{props.task.task_name}</h1>
            <button onClick={() => deleteTask(props.task._id)}>DELETE</button>
        </div>
    );
}
