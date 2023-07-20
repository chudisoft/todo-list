/**
 * @jest-environment jsdom
 */
import TodoList from './todolist.js';

const div = document.createElement('div');
div.id = 'todo-list';
document.body.appendChild(div);
const todoNew = new TodoList();
todoNew.renderTodoList();

const todoTest = {
  description: `Todo ${todoNew.getTodoList().length + 1}`,
  completed: false,
  index: todoNew.getTodoList().length + 1,
};
const todoTestList = [
  {
    description: `Todo ${todoNew.getTodoList().length + 2}`,
    completed: false,
    index: todoNew.getTodoList().length + 2,
  },
  {
    description: `Todo ${todoNew.getTodoList().length + 3}`,
    completed: false,
    index: todoNew.getTodoList().length + 3,
  },
  {
    description: `Todo ${todoNew.getTodoList().length + 4}`,
    completed: false,
    index: todoNew.getTodoList().length + 4,
  },
];

describe('CRUD operations', () => {
  test('Add todo', () => {
    const lastLength = todoNew.getTodoList().length;
    todoNew.addTodo(todoTest, true);
    todoNew.saveData();
    expect(todoNew.getTodoList().length).toBe(lastLength + 1);
  });

  test('Edit todo', () => {
    const index = 0;
    const newDescription = `Updated Todo ${index + 1}`;
    const todoEdited = {
      description: newDescription,
      completed: true,
      index: index + 1,
    };
    todoNew.updateTodo(todoEdited);
    expect(todoNew.getTodoList()[0].description).toBe(newDescription);
  });

  test('Update completed todo', () => {
    // Add 3 mock todos
    todoTestList.forEach((x) => {
      todoNew.addTodo(x, true);
    });
    const prevCompletedValue = todoNew.getTodoList()[1].completed;
    // Mark as completed 2 todos
    for (let index = 1; index < 2; index += 1) {
      const element = todoNew.getTodoList()[index];
      element.completed = true;
      todoNew.updateTodo(element);
    }

    expect(todoNew.getTodoList()[1].completed).toBe(!prevCompletedValue);
  });
  
 test('Clear completed todo', () => {
    // Clear completed todos
    todoNew.clearCompleted();
    expect(todoNew.getTodoList().length).toBe(2);
  });

  test('Delete todo', () => {
    const lastLength = todoNew.getTodoList().length;
    todoNew.removeTodo(todoNew.getTodoList()[0]);
    expect(todoNew.getTodoList().length).toBe(lastLength - 1);
  });
});
