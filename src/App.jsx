import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    <DndProvider backend={HTML5Backend}>
      <div className="bg-teal-900 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <ListTasks tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
        <Toaster position="bottom-right" />
      </div>
    </DndProvider>
  );
}

export default App;
