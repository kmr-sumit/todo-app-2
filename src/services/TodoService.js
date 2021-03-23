
import KEYS from './keys';

// export function buildTodo(value) {
//   return {
//     id: 0,
//     value: value,
//   };
// }
export function insertTodo(data) {
  let todos = getAllTodos();
//   data = buildTodo(data);
  data['id'] = generateTodoId();
  todos.push(data);
  localStorage.setItem(KEYS.todos, JSON.stringify(todos));
}

export function deleteTodo(id) {
  let todos = getAllTodos();
  todos = todos.filter((cnt) => cnt.id != id);
  localStorage.setItem(KEYS.todos, JSON.stringify(todos));
}

export function updateTodo(id, newValue) {
    let todos = getAllTodos();
    let todoIndex = todos.findIndex((todo => todo.id == id));
    todos[todoIndex].text = newValue.text;
    localStorage.setItem(KEYS.todos, JSON.stringify(todos));
  }

export function generateTodoId() {
  if (localStorage.getItem(KEYS.todoId) == null)
    localStorage.setItem(KEYS.todoId, '0');
  var id = parseInt(localStorage.getItem(KEYS.todoId));
  localStorage.setItem(KEYS.todoId, (++id).toString());
  return id;
}

export function getAllTodos() {
  if (localStorage.getItem(KEYS.todos) == null) {
    localStorage.setItem(KEYS.todos, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(KEYS.todos));
}

export function findById(id) {
  let todos = getAllTodos();
  return todos.filter((cnt) => cnt.id == id)[0];
}