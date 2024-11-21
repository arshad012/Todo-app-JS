
window.onload = () => {
    const todo = document.getElementById('todo-input');
    todo.focus();
}

let todosArr = [];
const todo_container = document.querySelector('.todos-container');

document.getElementById('add-todo').addEventListener('change', (e) => {
    const status = e.target.value;
    const todo = document.getElementById('todo-input');
    if(!todo.value || !status) {
        todo.focus();
        return;
    };

    const todoObj = {
        title:todo.value,
        status
    }

    todosArr.push(todoObj);
    appendTodos(todosArr);
    todo.value = '';
    status.value = '';
    todo.focus();
})


function appendTodos(todos) {
    todo_container.innerHTML = null;

    todos.forEach((todo, index) => {

        let borderColor;
        let fontColor;
        switch(todo.status) {
            case "Not Started": 
                borderColor = 'red';
                fontColor = 'red';
                break;
            case "In Progress": 
                borderColor = 'blue';
                fontColor = 'blue';
                break;
            case "Completed": 
                borderColor = 'green';
                fontColor = 'green';
                break;
        }
        
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';


        const number = document.createElement('p');
        number.className = 'number';
        number.innerText = index+1;

        const vertical_line = document.createElement('p');
        vertical_line.className = 'vertical-line';

        const title = document.createElement('p');
        title.className = 'title';
        title.innerText = todo.title;

        const todoTitle = document.createElement('div');
        todoTitle.className = 'todo-title';
        todoTitle.append(number, vertical_line, title);

        const todo_status = document.createElement('div');
        todo_status.className = 'todo-status';

        const status = document.createElement('p');
        status.className = 'status';
        status.innerText = todo.status;
        status.style.borderColor = borderColor;
        status.style.color = fontColor;
        
        const delete_icon = document.createElement('i');
        delete_icon.classList.add('fa-solid');
        delete_icon.classList.add('fa-trash');
        delete_icon.classList.add('delete-icon');
        delete_icon.setAttribute('title', `Delete ${todo.title} Todo`);
        delete_icon.onclick = () => {
            deleteTodo(index);
        }
        
        todo_status.append(status, delete_icon);

        todoDiv.append(todoTitle, todo_status);

        todo_container.append(todoDiv);
    });
}

function deleteTodo(index) {
    todosArr.splice(index, 1);
    appendTodos(todosArr);
}