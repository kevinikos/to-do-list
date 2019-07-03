function main() {
  var addBtn = document.querySelector(".btn-add");
  var deleteBtn = document.querySelector(".btn-delete");
  var toDoList = document.querySelector(".to-do-list");
  var taskInput = document.querySelector(".input-box input");
  var counterSpan = document.getElementById("counter");
  var counter = {
    value: 0,
    counterIncrement: function() {
      return ++this.value;
    },
    counterDecrement: function() {
      return --this.value;
    }
  };

  function userInput() {
    return taskInput.value;
  }

  function markTask() {
    this.parentNode.classList.toggle("cross-line");
    var tasks = [...toDoList.querySelectorAll("li")];
    var unfinishedTasks = tasks.filter(function(task) {
      return task.className != "cross-line";
    });
    counter.value = unfinishedTasks.length;
    counterSpan.innerText = counter.value;
  }

  function removeTask() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    counterSpan.innerText = counter.counterDecrement();
  }

  function createTask() {
    var taskContent = userInput();
    if (taskContent) {
      var task = document.createElement("li");
      // Complete button
      var taskCompleteBtn = document.createElement("button");
      var completeImg = document.createElement("i");
      toDoList.appendChild(task);
      task.innerText = taskContent;
      task.appendChild(taskCompleteBtn);
      taskCompleteBtn.appendChild(completeImg);
      taskCompleteBtn.setAttribute("title", "Complete");
      taskCompleteBtn.classList.add("btn", "btn-close");
      completeImg.classList.add("fa", "fa-close");
      // Trash button
      var taskTrashBtn = document.createElement("button");
      var trashImg = document.createElement("i");
      task.appendChild(taskTrashBtn);
      taskTrashBtn.appendChild(trashImg);
      taskTrashBtn.setAttribute("title", "Delete");
      taskTrashBtn.classList.add("btn", "btn-trash");
      trashImg.classList.add("fa", "fa-trash");
      // Button listeners
      taskCompleteBtn.addEventListener("click", markTask);
      taskTrashBtn.addEventListener("click", removeTask);
      // Task counter
      counterSpan.innerText = counter.counterIncrement();
    }
    // Empty input
    taskInput.value = "";
  }

  function removeDoneTasks() {
    var tasks = [...toDoList.querySelectorAll("li")];
    tasks.forEach(function(task) {
      if (task.className == "cross-line") {
        toDoList.removeChild(task);
      }
    });
  }

  taskInput.addEventListener("input", userInput);

  addBtn.addEventListener("click", createTask);

  deleteBtn.addEventListener("click", removeDoneTasks);
}
document.addEventListener("DOMContentLoaded", main);
