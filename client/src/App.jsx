import "./App.css";
import Register from "./components/Register";
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoList from "./components/ToDoList";
function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center h-screen">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/tasks" element={<ToDoList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
