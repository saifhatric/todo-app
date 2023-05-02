import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa"
import {
    useGetTodosQuery,
    usePostTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} from '../api/apiSlice'
const TodoList = () => {
    const [newTodo, setnewTodo] = useState("");

    const {
        data: todos,
        isSuccess,
        isLoading,
        error,
        isError
    } = useGetTodosQuery()

    const [addTodo] = usePostTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();


    const handleSubmit = (e) => {
        e.preventDefault()

        addTodo({ userId: 1, id: Date.now(), title: newTodo, completed: false })
        setnewTodo("")
    }
    const newItemSection = (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="new-Todo">Enter a new todo item</label>
            <div className="new-Todo">
                <input type="text" id="new-Todo"
                    value={newTodo}
                    onChange={(e) => setnewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                submit
            </button>
        </form >
    )
    let content;
    if (isLoading) {
        content = <h1>Just a second...</h1>
    } else if (isError) {
        content = <p>{error}</p>
    } else if (isSuccess) {
        content = Array.from(todos).map(todo => (
            <article key={todo.id}>
                <h2>{todo.title}</h2>
                <input type="checkbox" checked={todo.completed}
                    onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
                <button onClick={deleteTodo({ id: todo.id })}>delete</button>
            </article>
        )
        )
    }
    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList