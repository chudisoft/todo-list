/**
 * @jest-environment jsdom
 */
import TodoList from './todolist.js';
// const TodoList = require('./todolist.js');

const div = document.createElement('div');
div.id = 'todo-list';
document.body.appendChild(div);
const todoNew = new TodoList();

const todoTest = {
  description: `Todo ${todoNew.getTodoList().length + 1}`,
  completed: false,
  index: todoNew.getTodoList().length + 1,
};
describe('CRUD operations', () => {
  test('Add todo', () => {
    const lastLength = todoNew.getTodoList().length;
    todoNew.addTodo(todoTest, true);
    todoNew.saveData();
    expect(todoNew.getTodoList().length).toBe(lastLength + 1);
  });
});