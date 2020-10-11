//Define UI var

const form=document.querySelector('#task-form')
const taskList= document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput=document.querySelector('#task')


//load all event listner
loadEventListners();

//loading event listner

function loadEventListners(){
    //dom load event
     document.addEventListener('DOMContentLoaded',getTask)


    form.addEventListener('submit',addTask)

    //add remove event listner

    taskList.addEventListener('click',removeList)

    //clearing clist

    clearBtn.addEventListener('click',clearTask)

    //filtering data

    filter.addEventListener('keyup',filterTask)

}

//get task from LS
function getTask(){
       let tasks;

    if(localStorage.getItem('tasks')==null){
        tasks=[]
    }else{
       tasks= JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        //creating li List
        const li = document.createElement('li')
        //adding class to li
        li.className = "collection-item"
        //adding text
        li.appendChild(document.createTextNode(task))
        //creating link
        const link = document.createElement('a')
        //adding class to link
        link.className = "delete-item secondary-content";
        //adding icon 
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //apending link
        li.appendChild(link)
        //appending li tul
        taskList.appendChild(li)
    })
}

// add task

function addTask(e){

    if(taskInput.value==''){
        alert('enter task')
    }
        //creating li List
        const li =document.createElement('li')
        //adding class to li
        li.className="collection-item"
        //adding text
        li.appendChild(document.createTextNode(taskInput.value))
        //creating link
        const link=document.createElement('a')
        //adding class to link
        link.className="delete-item secondary-content";
        //adding icon 
        link.innerHTML='<i class="fa fa-remove"></i>'
        //apending link
        li.appendChild(link)
        //appending li tul
        taskList.appendChild(li)
        

        //adding to localstorage
        addTaskInLocalStrorage(taskInput.value )


    
     e.preventDefault()
} 

//add local function

const addTaskInLocalStrorage=(task)=>{
    let tasks;

    if(localStorage.getItem('tasks')==null){
        tasks=[]
    }else{
       tasks= JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
   localStorage.setItem('tasks',JSON.stringify(tasks))
}



//removeing task

function removeList(e){

    console.log(e.target)
    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are ypu sure')){
            e.target.parentElement.parentElement.remove()

        //remove task from localstroggae
        removetaskfromlocalstroage(e.target.parentElement.parentElement)
        }
    }

}

//clearing all task

function clearTask(){

    // taskList.innerHTML=''
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    //clear task from localstroage
    cleartaskfromlocalStorage()
}

function cleartaskfromlocalStorage(){
    localStorage.clear()
}
//filtering task

function filterTask(e){

    const text =e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(
        function(task){
           
            const item=task.firstChild.textContent
            if(item.toLowerCase().indexOf(text)!= -1){
                task.style.display='block'
            }else{
                task.style.display='none'
            }
        }
    )
    

    console.log(task)

}


function removetaskfromlocalstroage(taskItem){
       let tasks;

    if(localStorage.getItem('tasks')==null){
        tasks=[]
    }else{
       tasks= JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent==task)
        {
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}