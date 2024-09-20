import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";

const ListTasks = ({ tasks, setTasks, setTaskToEdit }) => {
  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex sm:gap-16 flex-col  md:flex-row">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          setTaskToEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, setTaskToEdit }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let bg = "bg-blue-100";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-100";
  } else if (status === "closed") {
    text = "Closed";
    bg = "bg-green-100";
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast("Task status updated", { icon: "👌" });
      return updatedTasks;
    });
  };

  const tasksToDisplay = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop}
      className={`w-64 p-2 rounded-lg ${isOver ? "bg-teal-800" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToDisplay.length} />
      {tasksToDisplay.map((task) => (
        <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
      ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex justify-between items-center px-3 h-12 pl-4 rounded-md uppercase text-sm`}
    >
      <h1>{text}</h1>
      <div className="ml-2 bg-white h-5 w-5 border-2 border-black border-solid text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const TaskItem = ({ task, tasks, setTasks, setTaskToEdit }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    toast("Task removed", { icon: "❌" });
  };

  const handleEdit = () => {
    setTaskToEdit(task);
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-lg rounded-2xl ${isDragging ? "opacity-25" : "opacity-100"} cursor-grab`}
    >
      <p>{task.name}</p>
      <div className="absolute top-3 right-2">
        <button className="pr-2" onClick={handleEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </button>
        <button onClick={() => handleDelete(task.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
