const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const btnAdd = document.querySelector('.add-btn');
const filterTask = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');

// const deleteClick = true;

//add task
btnAdd.addEventListener('click', addTask);
function addTask(e){

    const listItems = document.createElement('li');
    const link = document.createElement('a');

    listItems.className = 'collection-item';
    link.setAttribute('href', "#");
    link.className = 'delete-items secondary-content';

    listItems.innerText = taskInput.value;
    link.innerText = 'x';

    taskList.append(listItems);
    listItems.append(link);

    //store task to local storage
    storeTaskToLocalStorage(taskInput.value);

    //isprazni input nakon click-a
    taskInput.value = '';

    e.preventDefault();

}

//remove single task from DOM
taskList.addEventListener('click', removeTask);
function removeTask(e){
    if(e.target.classList.contains('delete-items')){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove()
            //console.log(e.target)

            //remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

//remove task from local storage
function removeTaskFromLocalStorage(listItems){
    //console.log(listItems)
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //delete
    tasks.forEach(function(taskInput, index){
        if(listItems.textContent === taskInput){
            tasks.splice(index, 1)
        }
    })

    //set again local storage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    //clear form local storage
    clearTasksFromLocalStorage()
}

//filter task
filterTask.addEventListener('keyup', filterTasks);
function filterTasks(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });

    e.preventDefault
}

//delete all tasks
clearBtn.addEventListener('click', deleteTasks);
function deleteTasks(){

    taskList.innerHTML = '';
    alert('Are you sure?')

    clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//add to local storage
function storeTaskToLocalStorage(taskInput){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskInput);

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

//get tasks from local storage
document.addEventListener('DOMContentLoaded', getTasks)
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(taskInput){
        const listItems = document.createElement('li');
        const link = document.createElement('a');

        listItems.className = 'collection-item';
        link.setAttribute('href', "#");
        link.className = 'delete-items secondary-content';

        listItems.innerText = taskInput;
        link.innerText = 'x';

        taskList.append(listItems);
        listItems.append(link);

    });
}

