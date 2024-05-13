import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {
    const [task,setTask] = useState({
        id:"",
        name:"",
        status:"todo"
    })
    console.log(task)
const handleSubmit = (e) =>
    {
        e.preventDefault() // prevent page from refreshing
        if(task.name.length < 3) return
        setTasks((prev)=>
        {
            const  list = [...prev,task]
            localStorage.setItem('tasks',JSON.stringify(list))
            return list
        }) /// this fun will update our state
        

    }
  return (
    <form onSubmit={handleSubmit}>
      <input className="border-2 rounded-lg mr-4 h-12" type="text" value={task.name} onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})} />
      <button className="bg-red-600 rounded-md px-4 h-12 text-white">Create Task</button>
    </form>
  );
};

export default CreateTask;
