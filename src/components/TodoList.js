import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import * as todoService from '../services/TodoService'

function TodoList() {
    const [todos, setTodos] = useState(todoService.getAllTodos());
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        todoService.insertTodo(todo);
        // const newTodos = [todo, ...todos];
        setTodos(todoService.getAllTodos());
    };
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        todoService.updateTodo(todoId,newValue);
        // setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        setTodos(todoService.getAllTodos())
    };
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        // call service of delete
        todoService.deleteTodo(id);
        setTodos(todoService.getAllTodos());
    };



    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    return (
        <div>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    );
}

export default TodoList;
