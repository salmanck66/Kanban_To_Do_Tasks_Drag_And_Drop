import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
  const [tasks, setTasks] = useState([{
    id: "234234",
    name: "Drag me",
    status: "todo"
  }]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) {
      setTasks(stored);
    }
  }, []);

  // Determine which backend to use
  const isMobile = window.innerWidth <= 768; // Adjust this value based on your requirement
  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="bg-teal-900 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <ListTasks tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
        <Toaster position="bottom-right" />
      </div>
    </DndProvider>
  );
}

export default App;
