function main() {
  var addBtn = document.querySelector(".btn-add");
  var deleteBtn = document.querySelector(".btn-delete");
  var toDoList = document.querySelector(".to-do-list");
  var taskInput = document.querySelector(".input-box input");
  var counterSpan = document.getElementById("counter");
  var rankList = document.getElementById("rankList");

  function taskCounter() {
    var tasks = [...toDoList.querySelectorAll("li")];
    var unfinishedTasks = tasks.filter(function(task) {
      return task.className != "cross-line";
    });
    var counter = unfinishedTasks.length;
    counterSpan.innerText =
      counter != 0 ? `To Do: ${counter}` : "Nothing To Do";
  }

  function userInput() {
    return taskInput.value;
  }

  function markTask() {
    this.parentNode.classList.toggle("cross-line");
    taskCounter();
  }

  function removeTask() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    taskCounter();
  }

  function createTask() {
    var taskContent = userInput();
    var taskRank = taskRankNumber();
    if (taskContent && taskContent.length <= 25) {
      var task = document.createElement("li");
      // Complete button
      var taskCompleteBtn = document.createElement("button");
      var completeImg = document.createElement("i");
      toDoList.appendChild(task);
      task.innerHTML = `${taskContent} <sup>${taskRank}</sup>`;
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
      taskCounter();
    } else if (taskContent.length > 25) {
      alert("Twoje zdanie nie może mieć więcej niż 25 znaków");
    }
    sortTasks();
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

  function taskRankNumber() {
    var userChoice = rankList.options[rankList.selectedIndex].value;
    // Chcialem uzyc 'this' zamiast 'rankList' ale nie moge? 'this' wskazuje na 'window'
    return userChoice;
  }

  function sortTasks() {
    var tasks = [...toDoList.querySelectorAll("li")];
    var sortedTasks = tasks.sort(function(a, b) {
      return (
        parseInt(b.firstElementChild.textContent, 10) -
        parseInt(a.firstElementChild.textContent, 10)
      );
    });
    clearList();
    // Dodawanie elementow od nowa jest malo efektywne ale tylko tak mi zadzialalo, moze konstruktor?
    for (var i = 0; i < sortedTasks.length; i++) {
      toDoList.appendChild(sortedTasks[i]);
    }
  }

  function clearList() {
    toDoList.innerHTML = "";
    return toDoList;
  }

  rankList.addEventListener("change", taskRankNumber);

  taskInput.addEventListener("input", userInput);

  addBtn.addEventListener("click", createTask);

  deleteBtn.addEventListener("click", removeDoneTasks);
}
document.addEventListener("DOMContentLoaded", main);
