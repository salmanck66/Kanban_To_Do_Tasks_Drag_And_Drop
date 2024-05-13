import React, { useEffect, useState } from "react";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const finProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");
    setTodos(fTodos);
    setInProgress(finProgress);
    setClosed(fClosed);
  }, [tasks]);
  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          task={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTasks;


const Section = ({ status, tasks, setTask, todos, inProgress, closed }) => {
  let text = "todo";
  let bg = "bg-blue-500";
  let taskToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    taskToMap = inProgress ;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    taskToMap = closed ;
  }
  return (
    <div className={`w-64`}>
      <Header text={text} bg={bg} count={taskToMap.length} />
      {taskToMap.length > 0 && taskToMap.map(task=> <Task key={task.id} tasks = {tasks} setTask = {setTask} task = {task} />)}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm`}>
      <h1>{text}</h1>
      <div className="ml-2 bg-white h-5 w-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};




const Task = ({ task,tasks,setTask }) => {
    console.log
    const handleDelete = (id) =>
        {
            
            const fTask = tasks.filter(t=>t.id !==id)
            console.log(fTask);
        }


  return (
    <div className={`relative p-4 mt-8 shadow-lg rounded-2xl     cursor-grab`}>
        <p>{task.name}</p>
        <button id={task.id} onClick={()=>handleDelete(task.id)} className="absolute bottom-2 right-1 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>
</button>
    </div>
  );
};
