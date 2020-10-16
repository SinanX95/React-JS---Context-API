import React, { useContext, useState, useEffect } from 'react';
import {TaskListContext} from '../context/TaskListContext';

const TaskForm = () => {
    // Using useContext, we will be able to use methods and storege provided by TaskListContext. We can specifically call methods and storage by using curly braces
    const {addTask, clearList, editTask, editItem} = useContext(TaskListContext);

    const [title, setTitle] = useState('');

    const handleChange = e => {
        setTitle(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(editItem === null) {
            addTask(title);
            setTitle("");
        } else {
            editTask(title, editItem.id)
        }
    }


    // The React hook useEffect helps in adding componentDidUpdate and componentDidMount combined lifecycle in React’s functional component. It rerenders component once the piece of state is updated
    useEffect(() => {
        if(editItem !== null){
            setTitle(editItem.title);
            console.log(editItem);
        } else {
            setTitle("");
        }
    }, [editItem]);
    // Run this hook when the value of editItem is updated.

    return (
        <form onSubmit={handleSubmit} className="form">
            <input value={title} onChange={handleChange} type="text" className="task-input" placeholder="Add Task..." required />
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                    { editItem === null ? "Add Task" : "Edit Task" }
                </button>
                <button onClick={clearList} className="btn clear-btn">Clear</button>
            </div>
        </form>
    )
}

export default TaskForm;
