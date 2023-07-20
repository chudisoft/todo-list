import moreImage from '../assets/images/icons/more.png';
import binImage from '../assets/images/icons/bin.png';

class TodoList {
  constructor() {
    this.todoList = [];

    this.todoListElement = document.querySelector('#todo-list');
    this.todoStorageName = 'todolist';
  }

  saveData() {
    localStorage.setItem(this.todoStorageName, JSON.stringify(this.todoList));
  }

  stopEdits() {
    this.saveData();
    this.todoListElement.childNodes.forEach((n) => {
      if (n.classList.contains('bg-brown')) {
        n.classList.toggle('bg-brown');
        n.childNodes[0].childNodes[1].classList.toggle('hidden');
        n.childNodes[0].childNodes[2].classList.toggle('hidden');
        n.childNodes[1].childNodes[0].classList.toggle('hidden');
        n.childNodes[1].childNodes[1].classList.toggle('hidden');
      }
    });
  }

  getTodoList() {
    return this.todoList;
  }

  clearCompleted() {
    for (let index = this.todoList.length - 1; index >= 0; index -= 1) {
      if (this.todoList[index].completed) {
        this.todoListElement.childNodes[index].remove();
      }
    }
    this.todoList = this.todoList.filter((_todo) => !_todo.completed);
    this.saveData();
  }

  renumberIndex() {
    for (let index = this.todoList.length - 1; index >= 0; index -= 1) {
      this.todoList[index].index = index + 1;
    }
  }

  updateTodo(todo) {
    const index = this.todoList.indexOf(todo);
    const item = this.todoList[index];
    item.description = todo.description;
    item.completed = todo.completed;
    this.saveData();
  }

  removeTodo(todo) {
    const index = this.todoList.indexOf(todo);
    this.todoList = this.todoList.filter((_todo) => _todo.index !== todo.index);
    this.renumberIndex();
    this.saveData();
    this.todoListElement.removeChild(this.todoListElement.childNodes[index]);
  }

  addTodo(todo, addToList = false) {
    if (addToList) this.todoList.push(todo);
    const divTodo = document.createElement('div');
    divTodo.className = 'todo bg';

    const divContainer1 = document.createElement('div');
    const divContainer2 = document.createElement('div');
    divContainer1.className = 'w-auto';
    divContainer2.className = 'w-auto';

    const elCompleted = document.createElement('input');
    const elDescription = document.createElement('label');
    const elDescriptionEditor = document.createElement('input');
    const img = document.createElement('img');

    elCompleted.type = 'checkbox';
    elDescriptionEditor.type = 'text';

    elCompleted.checked = todo.completed;
    elDescription.textContent = todo.description;
    elDescriptionEditor.value = todo.description;
    elDescriptionEditor.className = 'hidden borderless';
    elDescription.className = `${todo.completed ? 'cancelled' : ''}`;
    img.src = moreImage;

    const removeBtn = document.createElement('img');
    removeBtn.src = binImage;
    removeBtn.className = 'hidden';

    const startEdit = () => {
      divTodo.classList.toggle('bg-brown');
      elDescription.classList.toggle('hidden');
      elDescriptionEditor.classList.toggle('hidden');
      img.classList.toggle('hidden');
      removeBtn.classList.toggle('hidden');
      elDescriptionEditor.focus();
    };

    img.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      startEdit();
    });
    elDescription.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      startEdit();
    });

    removeBtn.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.removeTodo(todo);
    });
    elDescriptionEditor.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
    });
    elDescriptionEditor.addEventListener('keypress', (event) => {
      if (event.key === 'Esc') {
        this.stopEdits();
      } else if (event.key === 'Enter') {
        divTodo.classList.toggle('bg-brown');
        elDescription.textContent = elDescriptionEditor.value;
        todo.description = elDescriptionEditor.value;
        this.updateTodo(todo);
        elDescription.classList.toggle('hidden');
        elDescriptionEditor.classList.toggle('hidden');
        img.classList.toggle('hidden');
        removeBtn.classList.toggle('hidden');
      }
    });
    elCompleted.addEventListener('change', (event) => {
      const completed = event.target.checked;
      todo.completed = completed;
      this.updateTodo(todo);
      elDescription.classList.toggle('cancelled');
    });
    divContainer1.appendChild(elCompleted);
    divContainer1.appendChild(elDescription);
    divContainer1.appendChild(elDescriptionEditor);
    divContainer2.appendChild(img);
    divContainer2.appendChild(removeBtn);
    divTodo.appendChild(divContainer1);
    divTodo.appendChild(divContainer2);
    this.todoListElement.appendChild(divTodo);
  }

  renderTodoList() {
    const storedvalue = localStorage.getItem(this.todoStorageName);
    this.todoListElement.textContent = '';
    this.todoList = [];
    if (storedvalue !== null) {
      this.todoList = JSON.parse(storedvalue);
    }

    this.todoList.forEach((todo) => {
      this.addTodo(todo);
    });
  }
}

export default TodoList;