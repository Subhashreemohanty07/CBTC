document.addEventListener("DOMContentLoaded", function () {
  const addTitle = document.getElementById("addTitle");
  const addDescription = document.getElementById("addDescription");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const todoList = document.getElementById("todoList");
  const allTasksBtn = document.getElementById("allTasksBtn");
  const completedTasksBtn = document.getElementById("completedTasksBtn");
  const editModal = document.getElementById("editModal");
  const editTitle = document.getElementById("editTitle");
  const editDescription = document.getElementById("editDescription");
  const updateTaskBtn = document.getElementById("updateTaskBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");

  let allTask = [];
  let completedTask = [];
  let currentTaskIndex = null;

  // Load tasks from local storage on page load
  function loadTasks() {
      const savedTodo = JSON.parse(localStorage.getItem('todolist')) || [];
      const savedCompletedTask = JSON.parse(localStorage.getItem('completedTask')) || [];
      allTask = savedTodo;
      completedTask = savedCompletedTask;
      displayTasks(allTask);
  }

  function displayTasks(tasks) {
      todoList.innerHTML = "";
      tasks.forEach((task, index) => {
          const taskElement = document.createElement("div");
          taskElement.classList.add("todo-list-item");

          const taskInfo = document.createElement("div");
          taskInfo.classList.add("task-info");

          const taskTitle = document.createElement("h3");
          taskTitle.textContent = task.title;
          taskInfo.appendChild(taskTitle);

          const taskDescription = document.createElement("p");
          taskDescription.textContent = task.description;
          taskInfo.appendChild(taskDescription);

          if (task.completedOn) {
              const taskCompletedOn = document.createElement("p");
              taskCompletedOn.textContent = `Completed on: ${task.completedOn}`;
              taskCompletedOn.classList.add("complete-time");
              taskInfo.appendChild(taskCompletedOn);
          }

          taskElement.appendChild(taskInfo);

          const iconContainer = document.createElement("div");
          iconContainer.classList.add("icon");

          if (!task.completedOn) {
              const completeIcon = document.createElement("i");
              completeIcon.classList.add("fas", "fa-check-circle", "complete-icon");
              completeIcon.addEventListener("click", () => handleComplete(index));
              iconContainer.appendChild(completeIcon);

              const editIcon = document.createElement("i");
              editIcon.classList.add("fas", "fa-edit", "edit-icon");
              editIcon.addEventListener("click", () => handleEditTask(index));
              iconContainer.appendChild(editIcon);
          }

          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
          deleteIcon.addEventListener("click", () => handleDeleteTask(index, task.completedOn ? 'completed' : 'all'));
          iconContainer.appendChild(deleteIcon);

          taskElement.appendChild(iconContainer);

          todoList.appendChild(taskElement);
      });
  }

  // Add task
  addTaskBtn.addEventListener("click", function () {
      const title = addTitle.value.trim();
      const description = addDescription.value.trim();

      if (title === "" || description === "") {
          return;
      }

      const newTask = { title, description };
      allTask.push(newTask);
      localStorage.setItem('todolist', JSON.stringify(allTask));
      addTitle.value = "";
      addDescription.value = "";
      displayTasks(allTask);
  });

  // Delete task
  function handleDeleteTask(index, type) {
      if (type === 'all') {
          allTask.splice(index, 1);
          localStorage.setItem('todolist', JSON.stringify(allTask));
          displayTasks(allTask);
      } else {
          completedTask.splice(index, 1);
          localStorage.setItem('completedTask', JSON.stringify(completedTask));
          displayTasks(completedTask);
      }
  }

  // Edit task
  function handleEditTask(index) {
      currentTaskIndex = index;
      editTitle.value = allTask[index].title;
      editDescription.value = allTask[index].description;
      editModal.style.display = "flex";
      document.body.classList.add("modal-open");
  }

  updateTaskBtn.addEventListener("click", function () {
      allTask[currentTaskIndex] = {
          title: editTitle.value,
          description: editDescription.value
      };
      localStorage.setItem('todolist', JSON .stringify(allTask));
      displayTasks(allTask);
      editModal.style.display = "none";
      document.body.classList.remove("modal-open");
  });

  cancelEditBtn.addEventListener("click", function () {
      editModal.style.display = "none";
      document.body.classList.remove("modal-open");
  });

  // Complete task
  function handleComplete(index) {
      const now = new Date();
      const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      const completedTaskItem = {
          ...allTask[index],
          completedOn
      };
      completedTask.push(completedTaskItem);
      allTask.splice(index, 1);

      localStorage.setItem('todolist', JSON.stringify(allTask));
      localStorage.setItem('completedTask', JSON.stringify(completedTask));

      displayTasks(allTask);
  }

  // Toggle between All tasks and Completed tasks
  allTasksBtn.addEventListener("click", function () {
      displayTasks(allTask);
      allTasksBtn.classList.add("active");
      completedTasksBtn.classList.remove("active");
  });

  completedTasksBtn.addEventListener("click", function () {
      displayTasks(completedTask);
      allTasksBtn.classList.remove("active");
      completedTasksBtn.classList.add("active");
  });

  loadTasks();
});
