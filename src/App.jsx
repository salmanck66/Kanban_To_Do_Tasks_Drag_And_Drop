import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
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

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="bg-teal-900 w-full min-h-screen flex flex-col items-center p-3 gap-8 sm:gap-16 pt-16 sm:pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <ListTasks tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
        <Toaster position="bottom-right" />
      </div>
    </DndProvider>
  );
}

export default App;
