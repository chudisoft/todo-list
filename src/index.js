import './style.css';

let todoList = [];
const form = document.querySelector('form');
const todoListElement = document.querySelector('#todo-list');
const clearCompletedbtn = document.querySelector('#clear');
const todoStorageName = 'todolist';

function saveData() {
  localStorage.setItem(todoStorageName, JSON.stringify(todoList));
}

function clearCompleted() {
  for (let index = todoList.length - 1; index >= 0; index -= 1) {
    if (todoList[index].completed) {
      todoList.pop();
      todoListElement.childNodes[index].remove();
    }
  }
  saveData();
}

function stopEdits() {
  todoListElement.childNodes.forEach((n) => {
    if (n.classList.contains('bg-brown')) {
      n.classList.toggle('bg-brown');
      n.childNodes[0].childNodes[1].classList.toggle('hidden');
      n.childNodes[0].childNodes[2].classList.toggle('hidden');
      n.childNodes[1].childNodes[0].classList.toggle('hidden');
      n.childNodes[1].childNodes[1].classList.toggle('hidden');
    }
  });
}

function updateTodo(todo) {
  const index = todoList.indexOf(todo);
  const item = todoList[index];
  item.description = todo.description;
  item.completed = todo.completed;
  saveData();
}

function removeTodo(todo) {
  const index = todoList.indexOf(todo);
  todoList = todoList.filter((_todo) => _todo.index !== todo.index);
  saveData();
  console.log(todoListElement);
  console.log(index);
  console.log(todoList);
  todoListElement.removeChild(todoListElement.childNodes[index]);
}

function addTodo(todo) {
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
  img.src = './assets/images/icons/more.png';

  const removeBtn = document.createElement('img');
  removeBtn.src = './assets/images/icons/bin.png';
  removeBtn.className = 'hidden';
  img.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    divTodo.classList.toggle('bg-brown');
    elDescription.classList.toggle('hidden');
    elDescriptionEditor.classList.toggle('hidden');
    img.classList.toggle('hidden');
    removeBtn.classList.toggle('hidden');
    elDescriptionEditor.focus();
  });
  removeBtn.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    removeTodo(todo);
  });
  elDescriptionEditor.addEventListener('keypress', (event) => {
    if (event.key === 'Esc') {
      stopEdits();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      divTodo.classList.toggle('bg-brown');
      elDescription.textContent = elDescriptionEditor.value;
      todo.description = elDescriptionEditor.value;
      updateTodo(todo);
      elDescription.classList.toggle('hidden');
      elDescriptionEditor.classList.toggle('hidden');
      img.classList.toggle('hidden');
      removeBtn.classList.toggle('hidden');
    }
  });
  elCompleted.addEventListener('change', (event) => {
    const completed = event.target.checked;
    todo.completed = completed;
    updateTodo(todo);
    elDescription.classList.toggle('cancelled');
  });
  divContainer1.appendChild(elCompleted);
  divContainer1.appendChild(elDescription);
  divContainer1.appendChild(elDescriptionEditor);
  divContainer2.appendChild(img);
  divContainer2.appendChild(removeBtn);
  divTodo.appendChild(divContainer1);
  divTodo.appendChild(divContainer2);
  todoListElement.appendChild(divTodo);
}

function renderTodoList() {
  const storedvalue = localStorage.getItem(todoStorageName);
  todoListElement.textContent = '';
  todoList = [];
  if (storedvalue !== null) {
    todoList = JSON.parse(storedvalue);
  }
  todoList.forEach((todo) => {
    addTodo(todo);
  });
}

renderTodoList();
const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', () => {
  stopEdits();
});

clearCompletedbtn.addEventListener('click', () => {
  clearCompleted();
});

//  add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const desc = document.querySelector('#description').value.trim();
  if (desc !== '') {
    const todo = {
      description: desc,
      completed: false,
      index: todoList.length + 1,
    };
    addTodo(todo);
    todoList.push(todo);
    saveData();
    document.querySelector('#description').value = '';
  }
});