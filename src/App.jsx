import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(()=>
  {
setTasks(JSON.parse(localStorage.getItem('tasks')))
  },[])
  console.log(tasks)

  return (
    <div className="bg-fuchsia-800 w-screen h-screen flex flex-col items-center pt-3 gap-16">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
