const taskTxtBox = document.querySelector('.taskTxtBox');
const taskForm = document.querySelector('.taskForm');
const tasksContainer = document.querySelector('.tasksContainer');
const tasks = loadTasks();
tasks.forEach(addTaskElement);
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (taskTxtBox.value === '' || taskTxtBox.value === null)
        return;
    const newTask = {
        id: crypto.randomUUID(),
        taskInformation: taskTxtBox.value,
        taskCompleted: false,
    };
    taskTxtBox.value = '';
    tasks.push(newTask);
    saveTasks();
    addTaskElement(newTask);
});
function addTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.insertBefore(taskElement, tasksContainer.firstChild);
    const taskStatusCheckBox = document.createElement('input');
    taskStatusCheckBox.type = 'checkbox';
    taskStatusCheckBox.checked = task.taskCompleted;
    if (taskStatusCheckBox.checked) {
        taskElement.remove();
        tasksContainer.appendChild(taskElement);
    }
    taskStatusCheckBox.addEventListener('change', () => {
        task.taskCompleted = taskStatusCheckBox.checked;
        taskInformation.style.textDecoration = '';
        if (taskStatusCheckBox.checked) {
            taskElement.remove();
            tasksContainer.appendChild(taskElement);
            taskInformation.style.textDecoration = 'line-through';
        }
        saveTasks();
    });
    taskStatusCheckBox.classList.add('taskStatusCheckBox');
    taskElement.appendChild(taskStatusCheckBox);
    const taskInformation = document.createElement('h1');
    taskInformation.classList.add('taskInformation');
    taskInformation.textContent = task.taskInformation;
    if (taskStatusCheckBox.checked) {
        taskInformation.style.textDecoration = 'line-through';
    }
    taskElement.appendChild(taskInformation);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
        var _a;
        const indexToDelete = tasks.findIndex((taskObject) => (taskObject.id = task.id));
        if (indexToDelete !== -1) {
            tasks.splice(indexToDelete, 1);
        }
        saveTasks();
        (_a = deleteButton.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    taskElement.appendChild(deleteButton);
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('trashIcon');
    trashIcon.classList.add('fa-solid');
    trashIcon.classList.add('fa-trash');
    trashIcon.classList.add('fa-2xl');
    deleteButton.appendChild(trashIcon);
}
function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function loadTasks() {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
export {};
//# sourceMappingURL=index.js.map