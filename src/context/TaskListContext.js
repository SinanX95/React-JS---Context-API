import React, { createContext, useState } from 'react';
import {v4 as uuidv4} from 'uuid'; // It provides id number

// We can use this context in other components with useContext(TaskListContext). You can put methods and storage provided in this file into this context. So, we can transfer methods and storage to other components.
export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    const [tasks, setTasks] = useState([
        {title: 'Read the book', id: 1},
        {title: 'Wash the car', id: 2},
        {title: 'Write some code', id: 3},        
    ]);

    const [editItem, setEditItem] = useState(null);

    const addTask = (title) => {
        setTasks([...tasks, { title: title, id: uuidv4() }])
    }

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id ));
    }

    const clearList = () => {
        setTasks([]);
    }

    const findItem = id => {
        const item = tasks.find(task => task.id === id);

        setEditItem(item);
    }

    const editTask = (title, id) => {
        const newTasks = tasks.map(task => (task.id === id) ? {title, id} : task);

        setTasks(newTasks);
        setEditItem(null);
    }

    return (
        <TaskListContext.Provider value={{
            tasks, 
            addTask, 
            removeTask, 
            clearList, 
            findItem, 
            editTask,
            editItem}}
        >
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;