import { useLocation } from "react-router-dom"

export default function ToDoList(){
    const location = useLocation();
    const {user} = location.state || {};
    return <div>
        {!user ? <p>You are not signed in!</p>: <p>You are logged in as {user.username}</p>}
    </div>
}