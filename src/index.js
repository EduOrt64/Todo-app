import "./styles.css";


if (localStorage.getItem("projects") === "undefined") {
    localStorage.removeItem("projects");
  }
window.onload = () => {
  updateStoreProjects();
};

export const projects = [];

import "./dom.js";
import {
  handleNewProject,
  homeBtn,
  myDaybtn,
  renderMyDay,
  renderUrgentTasks,
  urgenTasksBtn,
  clickedProject,
  renderDeleteMsg,
} from "./dom.js";
import { projectListRender } from "./dom.js";
import { todayList } from "./datesHandle.js";

const confirmDeleteProject = document.querySelector(".delete-project-confirm");

const today = new Date();
let toDoToday = [];
let urgentTasks = [];

// Task Class
class Task {
  constructor(title, description, dueDate, priority, note, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.note = note;
    this.checklist = checklist;
  }
}

// Project Class
class Project {
  constructor(name, description, tasks = []) {
    this.name = name;
    this.description = description;
    this.tasks = tasks;
  }
}

export function addProject(name, description, tasks = []) {
  return new Project(name, description, tasks); // Returns a new Project object
}
export function addTask(title, description, dueDate, priority, note) {
  return new Task(title, description, dueDate, priority, note);
}

const sampleTasks = [
  new Task(
    "Buy materials",
    "Get fabric and tools for surgery kits",
    "2025-04-10",
    "Urgent",
    "Don't forget the gloves"
  ),
  new Task(
    "Assemble kits",
    "Organize components and assemble the packs",
    "2025-04-08",
    "Normal",
    "Add extra sterilized packs"
  ),
  new Task(
    "Quality check",
    "Test a few kits and make sure they're sealed correctly",
    "2025-04-08",
    "Not a Priority",
    "Use checklist before shipping"
  ),
];

const sampleProject = new Project(
  "Surgical Kits v1",
  "Initial batch for hospital order",
  sampleTasks
);
//call functions

projects.push(sampleProject);

projectListRender();

toDoToday = todayList(projects);

console.log(projects);

myDaybtn(toDoToday);
urgentTasks = importantTaskList(projects);

urgenTasksBtn(urgentTasks);

//renderMyDay(toDoToday);
console.log(toDoToday);

console.log(urgentTasks);

//functions

export function importantTaskList(object) {
  return object.flatMap((project) =>
    project.tasks.filter((task) => task.priority === "Urgent")
  );
}

console.log(projects);

function deleteProject() {
  let index = projects.findIndex((project) => project.name === clickedProject);

  projects.splice(index, 1);
}

confirmDeleteProject.addEventListener("click", () => {
  deleteProject();
  storeProjectData(projects);
  renderDeleteMsg();
});

//local storage functions
export function storeProjectData(object) {
  const projectJson = JSON.stringify(object);

  console.log(projectJson);

  localStorage.setItem("projects", projectJson);
}

function getStoreProjects() {
  const projectsStr = localStorage.getItem("projects");

  if (!projectsStr) {
    console.warn("No projects in localStorage yet.");
    return [];
  }

  const parsedObject = JSON.parse(projectsStr);
  console.log(parsedObject);
  return parsedObject;
}

function updateStoreProjects() {
  let storeProjects = getStoreProjects();

  projects.length = 0;
  storeProjects.forEach((project) => projects.push(project));

  projectListRender();
}
