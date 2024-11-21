function addTask(taskObject = null) {
  
    // אם אין אובייקט בזיכרון,יוצרים אחד חדש מתוך שדה הקלט
    if (!taskObject) {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        // בדיקה אם אינפוט ריק
        if (!taskText) {
            alert("Please Write A Task Before Adding!");
            return;
        }
      
        // יצירת אובייקט משימה חדש
        taskObject = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // שמירה בזיכרון
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskObject);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = ""; // איפוס האינפוט
    }

    // יצירת פתק חדש
    const newTask = document.createElement("div");
    newTask.classList.add("task-card");
    if (taskObject.completed) {
        newTask.classList.add("completed"); // במידה והמשימה הושלמה
    }

    // יצירת אלמנט שמכיל טקסט לפתק
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-text");
    taskContent.textContent = taskObject.text;
    taskContent.setAttribute("contenteditable", "true");

    // יצירת כפתור מחיקה לפתק
    const deleteButton = document.createElement("div");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");

    // יצירת כפתור השלמת משימה לפתק
    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-btn");

    // עדכון כפתור בהתאם למצב המשימה
    if (taskObject.completed) {
        completeButton.textContent = "Undo Completion"; // אם המשימה הושלמה
    } else {
        completeButton.textContent = "Check"; // אם המשימה לא הושלמה
    }

    // הוספת אירוע לחיצה שמפעיל פונקציית מחיקה
    deleteButton.addEventListener("click", function () {
        deleteTask(newTask, taskObject.id);
    });

    // הוספת אירוע לחיצה שמפעיל פונקציית עריכת משימה
    newTask.addEventListener("click", function () {
        editTask(taskContent, taskObject.id);
    });

    // הוספת אירוע לחיצה שמפעיל פונקציית השלמת משימה
    completeButton.addEventListener("click", function () {
        completedTask(newTask, completeButton, taskObject.id);
    });

    // הוספת כפתורים ותוכן לפתק
    newTask.appendChild(deleteButton);
    newTask.appendChild(taskContent);
    newTask.appendChild(completeButton);

    // הוספת הפתק לתוך הקונטיינר כדי שיוצג במסך
    const taskContainer = document.getElementById("tasks-container");
    taskContainer.appendChild(newTask);
}



function loadTasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskObject => {
        addTask(taskObject);
    });
}
document.addEventListener("DOMContentLoaded", loadTasks);



//פונקציית השלמת/ביטול-השלמת משימה 
function completedTask(thisTask,completeButton,taskId){
  
    if(thisTask.classList.contains("completed")){
        thisTask.classList.remove("completed");
        completeButton.textContent = "Check";
    }
    else{
       thisTask.classList.add("completed");
       completeButton.textContent="Undo Completion";
    }
    
    // עדכון המצב גם בזיכרון
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);  // מציאת המשימה לפי ID
    if (task) {
        task.completed = !task.completed;  // מעדכנים את הסטטוס של המשימה
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));  // עדכון השמירה

}




//פונקציית מחיקה שמקבלת את אותו פתק ספציפי כפרמטר
function deleteTask(thisTask, taskId){

    thisTask.remove();  // מחיקת הפתק מהדף
  
    // מחיקת המשימה מהמאגרים בזיכרון
    let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));  
}

