class Todo {
    term;
    constructor() {
        this.tasks = [];
    }

    draw() {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const div = document.createElement('div');
            div.className = 'task';
            div.innerHTML = `
                <input type="checkbox">
                <span class="task-name">${task.name}</span>
                <span class="due-date">${task.date}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            tasks.appendChild(div);
        });
        document.getElementById('new-task-name').value = '';
        document.getElementById('new-task-due-date').value = '';
        localStorage.setItem('tasks', JSON.stringify(toDo.tasks));
    }

    add(task) {
        this.tasks.push(task);
        this.draw();
    }

    remove(index) {
        this.tasks.splice(index, 1);
        this.draw();
    }

    drawFiltered() {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        const filteredTasks = this.tasks
            .map((task, index) => ({task, index}))
            .filter(({task}) => {
            return task.name.includes(this.term);
        });
        const regExp = new RegExp(`(${this.term})`);
        filteredTasks.forEach(({task, index}) => {
            const highlightedName = task.name.replace(regExp, '<mark>$1</mark>');
            const div = document.createElement('div');
            div.className = 'task';
            div.innerHTML = `
                <input type="checkbox">
                <span class="task-name">${highlightedName}</span>
                <span class="due-date">${task.date}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            tasks.appendChild(div);
        });
    }
}

class Task {
    constructor(name, date) {
        this.name = name;
        this.date = date;
    }
}

const toDo = new Todo();
if (localStorage.getItem('tasks') !== null) {
    toDo.tasks = JSON.parse((localStorage.getItem('tasks')));
    toDo.draw();
}

document.getElementById('add-task-btn').onclick = function() {
    const name = document.getElementById("new-task-name").value;
    const dateInput = document.getElementById("new-task-due-date");
    const dueDate = dateInput.value;
    const isBadInput = dateInput.validity.badInput;
    const isDueDateInFuture = new Date(dueDate) > new Date();
    debugger;
    if (name.length >= 3 && name.length <= 255 && ((dueDate === '' && !isBadInput) || isDueDateInFuture)) {
        toDo.add(new Task(name, dueDate));
    } else {
        if (name.length < 3) {
            alert("Nazwa zadania musi składać się z minimum 3 znaków!");
        }
        if (name.length > 255) {
            alert("Nazwa zadania musi składać się z maksymalnie 255 znaków!");
        }
        if (isBadInput) {
            alert("Wprowadzono niepoprawne dane w dacie!");
        } else if (!isDueDateInFuture && dueDate !== '') {
            alert("Data musi być w przyszłości!");
        }
    }
}

document.getElementById("tasks").addEventListener('click', function (e) {
    if (e.target.className === 'delete-btn') {
        const index = e.target.dataset.index;
        toDo.remove(index);
    } else {
        let editedTask = e.target;
        while (editedTask.className !== 'task') {
            editedTask = editedTask.parentNode;
        }
        const originalTask = new Task(editedTask.querySelector(".task-name").innerText, editedTask.querySelector(".due-date").innerText);
        const index = editedTask.querySelector(".delete-btn").dataset.index;
        editedTask.innerHTML = `
            <form>
            <input type="text" id="name" value="` + originalTask.name + `">
            <input type="date" id="date" value="` + originalTask.date + `">
            <input type="submit" value="Save edit">
            <button class="delete-btn" data-index="` + index + `">Delete</button>
            </form>
        `;

        editedTask.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();
        })

        function save(e) {
            if (!editedTask.contains(e.target)) {
                const newName = editedTask.querySelector("#name").value;
                const newDate = editedTask.querySelector("#date").value;
                toDo.tasks[index] = new Task(newName, newDate);
                toDo.draw();
                document.removeEventListener('click', save);
            }
        }

        setTimeout(() => document.addEventListener('click', save));
    }
})

document.getElementById('task-search').addEventListener('input', function () {
    const searchBar = document.getElementById('task-search');
    if (searchBar.value.length < 2) {
        toDo.draw();
    }
    if (searchBar.value.length >= 2) {
        toDo.term = searchBar.value;
        toDo.drawFiltered();
    }
})