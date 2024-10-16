/* eslint-disable react/prop-types */

export default function ToDo(props) {
  return <div className="border border-blue-500 flex justify-between">
    {props.name}
    <button>Delete</button>
    </div>;
}
