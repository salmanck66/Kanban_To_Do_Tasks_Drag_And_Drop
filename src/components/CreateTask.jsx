import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks, taskToEdit, setTaskToEdit }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
            setIsEditing(true);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name.length < 3) 
            return toast.error("Minimum Length Should Be 3 Characters");     
        if (task.name.length > 100) 
            return toast.error("Maximum Length Shouldn't Be greater than 100 Characters");

        if (isEditing) {
            setTasks((prev) => {
                const updatedTasks = prev.map(t => t.id === task.id ? task : t);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            toast.success("Task Updated Successfully");
            setIsEditing(false);
            setTaskToEdit(null);
        } else {
            setTasks((prev) => {
                const newTask = { ...task, id: uuidv4() };
                const list = [...prev, newTask];
                localStorage.setItem('tasks', JSON.stringify(list));
                return list;
            });
            toast.success("Task Created Successfully");
        }

        setTask({
            id: "",
            name: "",
            status: "todo"
        });
    };

    const handleChange = (e) => {
        setTask({ ...task, name: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="border-2 rounded-lg mr-4 h-12" type="text" value={task.name} onChange={handleChange} />
            <button className="bg-green-950 hover:bg-green-800 rounded-md px-4 h-12 text-white">
                {isEditing ? "Update Task" : "Create Task"}
            </button>
        </form>
    );
};

export default CreateTask;
