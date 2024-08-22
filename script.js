document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const tasks = [];

    const renderTasks = (filter = 'all') => {
        todoList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach((task, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn">${task.completed ? '✅' : '❌'}</button>
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;

            todoItem.querySelector('.complete-btn').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                renderTasks(filter);
            });

            todoItem.querySelector('.edit-btn').addEventListener('click', () => {
                const newText = prompt('Edit your task:', task.text);
                if (newText) {
                    tasks[index].text = newText.trim();
                    renderTasks(filter);
                }
            });

            todoItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks(filter);
            });

            todoList.appendChild(todoItem);
        });
    };

    addBtn.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            tasks.push({ text: todoText, completed: false });
            todoInput.value = '';
            renderTasks();
        } else {
            alert("Please enter a task!");
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(btn.getAttribute('data-filter'));
        });
    });

    renderTasks();
});
