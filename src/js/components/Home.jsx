import React, { useState, useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]); // Estado para las tareas
    const [newTask, setNewTask] = useState(""); // Estado para la nueva tarea
    const username = "tu_usuario"; // 🔴 CAMBIA esto por tu usuario real
    const apiUrl = `https://playground.4geeks.com/todo/todos/${username}`;

    // 1. Obtener las tareas al cargar la app (GET)
    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    console.error("Formato de datos incorrecto:", data);
                }
            })
            .catch(error => console.error("Error obteniendo tareas:", error));
    }, []);

    // 2. Agregar una tarea (PUT)
    const addTask = () => {
        if (newTask.trim() === "") return; // No permitir tareas vacías

        const updatedTasks = [...tasks, { label: newTask, done: false }];

        fetch(apiUrl, {
            method: "PUT",
            body: JSON.stringify(updatedTasks),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(() => {
            setTasks(updatedTasks);
            setNewTask(""); // Limpiar input
        })
        .catch(error => console.error("Error agregando tarea:", error));
    };

    // 3. Eliminar una tarea (PUT)
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);

        fetch(apiUrl, {
            method: "PUT",
            body: JSON.stringify(updatedTasks),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(() => setTasks(updatedTasks))
        .catch(error => console.error("Error eliminando tarea:", error));
    };

    // 4. Limpiar todas las tareas (DELETE)
    const clearTasks = () => {
        fetch(apiUrl, { method: "DELETE" })
            .then(response => response.json())
            .then(() => setTasks([]))
            .catch(error => console.error("Error eliminando todas las tareas:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">To-Do List</h1>

            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Escribe una nueva tarea..."
                />
                <button className="btn btn-primary ms-2" onClick={addTask}>Agregar</button>
            </div>

            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {task.label}
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>X</button>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <button className="btn btn-warning mt-3 w-100" onClick={clearTasks}>
                    Borrar todas las tareas
                </button>
            )}
        </div>
    );
};

export default Home;