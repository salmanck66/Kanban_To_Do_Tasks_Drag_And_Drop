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
  let bg = "bg-slate-500";
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
    <div className={`${bg} bg-slate-500 flex items-center h-12 pl-4 rounded-md uppercase text-sm`}>
      <h1>{text}</h1>
      <div className="ml-2 bg-white h-5 w-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};



const Task = ({ task,tasks,setTask }) => {
  return (
    <div className={` bg-slate-500 flex items-center h-12 pl-4 rounded-md uppercase text-sm`}>
        <p>{task.name}</p>
    </div>
  );
};
