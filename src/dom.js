import "./index.js";
import { addProject } from "./index.js";
import { projects } from "./index.js";
import { addTask } from "./index.js";
import { storeProjectData } from "./index.js";

const btnCreateProject = document.querySelector(".btn-create-project");
const formNewProject = document.querySelector("#form-container");
const closeBtn = document.querySelector(".close-btn");
const addTaskBtn = document.querySelector("#add-task");
const formNewTask = document.querySelector("#new-tasks-form");
const addNewTaksBtn = document.querySelector("#btn-add-task");
const myDay = document.querySelector("#my-day");
export const messageScreen = document.querySelector(".message-screen");
const urgentBtn = document.querySelector("#urgent-btn");
const menuNewProjBtn = document.querySelector(".new-project-btn");
const projectListParent = document.querySelector("#project-list-name");
const projectMenuList = document.querySelectorAll(".menu-project-list");
const closeTaskFormBtn = document.querySelector(".close-btn2");
const dialog = document.querySelector("dialog");

const deleteProjectConfirm = document.querySelector(".delete-project-confirm");
const cancelDeleteBtn = document.querySelector(".cancel-delete");

let currentTask = [];
let taskFormMode = "new-project";

// Event listeners
export const newProjectButton = btnCreateProject.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    cleanTasksScreen();
    cleanTextScreen();
    clearProjectTitle();
    handleNewProject();
    closeForm(formNewProject);
    storeProjectData(projects);
    projectListRender();
  }
);

export let clickedProject = null;

projectListParent.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-project-list")) {
    const projectName = e.target.dataset.projectName;
    cleanTasksScreen();
    cleanTextScreen();

    closeForm(formNewProject);
    clickedProject = projects.find((project) => project.name === projectName);

    if (clickedProject) {
      projectTitleRender();
      tasksRender();
      projectBtnGenerator();
    } else {
      console.log("Project not found");
    }
  }
});

export function myDaybtn(objectToRender) {
  myDay.addEventListener("click", () => {
    const messageScreen = document.querySelector(".message-screen");
    closeForm(formNewProject);
    cleanTasksScreen();
    cleanTextScreen();
    clearProjectTitle();
    renderMyDay(objectToRender);
  });
}

export function urgenTasksBtn(objectToRender) {
  urgentBtn.addEventListener("click", () => {
    const messageScreen = document.querySelector(".message-screen");
    closeForm(formNewProject);
    cleanTasksScreen();
    cleanTextScreen();
    clearProjectTitle();
    renderUrgentTasks(objectToRender);
  });
}

closeBtn.addEventListener("click", () => {
  closeForm(formNewProject);
});

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleNewTask();
  closeForm(formNewTask);
  if (taskFormMode === "new-project") {
    showForm(formNewProject);
  } else closeForm(formNewProject);
  
});

addNewTaksBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskFormMode = "new-project";
  closeForm(formNewProject);
  showForm(formNewTask);
});

menuNewProjBtn.addEventListener("click", (e) => {
  clearProjectTitle();
  const eventclass = e.target.classList.value;
  console.log(eventclass);

  cleanTasksScreen();

  cleanTextScreen();

  showForm(formNewProject);
});

closeTaskFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeForm(formNewTask);
});

cancelDeleteBtn.addEventListener("click", () => {
  dialog.close();
});

// Dom manipulation functions
function showForm(formName) {
  formName.classList.remove("hidden");
}
export function renderMyDay(object) {
  messageScreen.innerHTML = `<h1>Welcome</h1>`;

  if (object.length === 0) {
    messageScreen.innerHTML += `<h2>You don't have tasks for today 🧘</h2>`;
    return;
  }

  messageScreen.innerHTML += `<h2>Here is a list of your tasks for today:</h2>`;

  const listElement = document.createElement("ul");
  messageScreen.appendChild(listElement);

  object.forEach((task) => {
    const todayTasksList = document.createElement("li");
    todayTasksList.textContent = `${task.title}`;
    listElement.appendChild(todayTasksList);
  });
}

export function handleNewProject() {
  const projectName = document.querySelector(".name-project");
  const projectDescription = document.querySelector(".project-description");

  if (!projectName.value.trim()) {
    console.warn("Project name is empty. Skipping creation.");
    return;
  }

  const newProject = addProject(
    projectName.value,
    projectDescription.value,
    currentTask
  );
  projects.push(newProject);

  console.log("Updated Projects Array:", projects);
  currentTask = {};
}

function closeForm(element) {
  element.classList.add("hidden");
}

export function handleNewTask() {
  const title = document.querySelector("#new-task-text");
  const description = document.querySelector("#new-task-desc");
  const dueDate = document.querySelector("#due-date");
  const prioritySelect = document.querySelector("#select");
  const selectedPriority = prioritySelect.value;
  const notes = document.querySelector("#notes");

  const newTask = addTask(
    title.value,
    description.value,
    dueDate.value,
    selectedPriority,
    notes.value
  );

  if (taskFormMode === "new-project") {
    currentTask.push(newTask);
  } else if (taskFormMode === "existing-project") {
    clickedProject.tasks.push(newTask);
  }
}

function projectTitleRender() {
  clearProjectTitle();

  const screen = document.querySelector(".content-screen");

  const projectHeader = document.createElement("h2");
  projectHeader.textContent = clickedProject.name;
  projectHeader.classList.add("project-header");

  screen.appendChild(projectHeader);
}

function tasksRender() {
  const screen = document.querySelector("#tasks-screen");

  clickedProject.tasks.forEach((element) => {
    const screenChild = document.createElement("div");
    screenChild.classList.add("task-card");

    screenChild.innerHTML = `
      <div class="task-header">
        <h3 class="task-title">${element.title}</h3>
        <button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
      <p class="task-desc">${element.description}</p>
      <div class="task-meta">
        <span class="task-date">Due: ${element.dueDate}</span>
        <span class="task-priority">${element.priority}</span>
      </div>
    `;
    if (element.priority === "Urgent") {
      screenChild.querySelector(".task-priority").classList.add("urgent");
    } else if (element.priority === "Normal") {
      screenChild.querySelector(".task-priority").classList.add("normal");
    } else {
      screenChild.querySelector(".task-priority").classList.add("low");
    }
    screen.appendChild(screenChild);

    //  Add delete logic
    const deleteBtn = screenChild.querySelector(".delete-task-btn");
    deleteBtn.addEventListener("click", () => {
      screenChild.remove();
    });
  });
}

export function projectListRender() {
  const projectList = document.querySelector("#project-list-name");

  projectList.innerHTML = "";

  projects.forEach((project) => {
    const projectListChild = document.createElement("li");
    projectListChild.textContent = `${project.name}`;
    projectListChild.dataset.projectName = project.name;

    projectList.appendChild(projectListChild);
    projectListChild.classList.add("menu-project-list");
  });
}
//render urgentTask
export function renderUrgentTasks(urgentTasksList) {
  let htmlContent = `<h1><i class="fa-solid fa-bell"></i> Urgent Tasks</h1>`;

  if (urgentTasksList.length === 0) {
    htmlContent += `<h2>You don't have urgent tasks for today 🧘</h2>`;
    messageScreen.innerHTML = htmlContent;
    return;
  }

  htmlContent += `<h2>These are your urgent tasks:</h2>`;
  messageScreen.innerHTML = htmlContent;

  const listElement = document.createElement("ul");
  messageScreen.appendChild(listElement);

  urgentTasksList.forEach((task) => {
    const urgentTaskItem = document.createElement("li");
    urgentTaskItem.textContent = task.title;
    listElement.appendChild(urgentTaskItem);
  });
}

function cleanTasksScreen() {
  document.querySelector("#tasks-screen").innerHTML = "";
}

function cleanTextScreen() {
  messageScreen.innerHTML = "";
}

function clearProjectTitle() {
  const header = document.querySelector(".project-header");
  if (header) {
    header.remove();
  }
}
function projectBtnGenerator() {
  const screen = document.querySelector("#tasks-screen");
  const doubleBtnContainer = document.createElement("div");

  screen.insertAdjacentElement("beforeend", doubleBtnContainer);
  doubleBtnContainer.classList.add("btn-project-container");

  doubleBtnContainer.innerHTML = `

  <button class="delete-proj"><i class="fa-solid fa-trash"></i> Delete Project</button>
  <button class="refresh-btn"><i class="fa-solid fa-rotate"></i> Refresh</button>
  <button class="add-task-proj"><i class="fa-solid fa-plus"></i> Add Task</button>
  
  `;
  const dialog = document.querySelector("dialog");
  const deleteProjectBtn = document.querySelector(".delete-proj");
  const refreshTaskList = document.querySelector(".refresh-btn");
  const adTaskBtn = document.querySelector(".add-task-proj");

  deleteProjectBtn.addEventListener("click", () => {
    dialog.showModal();
    
  });
  refreshTaskList.addEventListener("click", () => {
    const screen = document.querySelector("#tasks-screen");
    screen.innerHTML = "";

    tasksRender();
    projectBtnGenerator();
  });

  adTaskBtn.addEventListener("click", () => {
    taskFormMode = "existing-project";
    showForm(formNewTask);
  });
}

export function renderDeleteMsg() {
  cleanTasksScreen();
  cleanTextScreen();
  clearProjectTitle();

  const screen = document.querySelector("#tasks-screen");

  const msg = document.createElement("div");

  msg.innerHTML = `
   <h1 class="project-remove-msg"><i class="fa-solid fa-circle-check"></i> The project has been removed</h1> 
    
    `;

  screen.appendChild(msg);
  projectListRender();
}

console.log(currentTask);
