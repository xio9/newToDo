'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const headerButton = document.querySelector('.header-button');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

todoData = JSON.parse(localStorage.getItem('todo'));

const renderTodo = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
			<button class="todo-remove"></button>
			<button class="todo-complete"></button>
		</div>
        `;

        if (item.completed == true) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnCompl = li.querySelector('.todo-complete');
        const btnRemove = li.querySelector('.todo-remove');

        btnCompl.addEventListener('click', function () {
            item.completed = !item.completed;
            renderTodo();
        });

        btnRemove.addEventListener('click', function () {
            todoData.splice(index, 1);
            renderTodo();
        });

    });
}

let check;

const checkValue = function () {
    if (headerInput.value == '') {
        check = true;
    } else {
        check = false;
    }
    return check;
}


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    checkValue();
    if (check == false) {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        headerInput.value = '';
        localStorage.setItem('todo', JSON.stringify(todoData));
        renderTodo();
    } else {
        checkValue();
    }
});

renderTodo();