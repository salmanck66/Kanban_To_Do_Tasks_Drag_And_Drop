import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(()=>
  {
setTasks(JSON.parse(localStorage.getItem('tasks')))
  },[])

  return (
    <div className="bg-fuchsia-800 w-screen h-screen flex flex-col items-center  gap-16 pt-32">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
      <Toaster />

    </div>
    
  );
}

export default App;
