const inputTodo = document.querySelector("input");
const addTodoHandler = document.getElementById("addTodoHandler");
const listItens = document.querySelector("ul");
const itensleft = document.getElementById("quantity");
const clear = document.getElementById("clear_all");
const completed = document.getElementById("completed");
const allItens = document.getElementById("all");
const buttonMode = document.getElementById("mode-icon");
const backgroundImage = document.querySelector("picture");
const active = document.getElementById("active");
let dragitens = document.querySelectorAll(".container-list ul li");
let mql = window.matchMedia("(max-width: 375px");
let circleDecoration = document.getElementById("circle-decoration");
let mql2 = window.matchMedia("(min-width: 680px");

const STATUS = "status";
const ITEM = "item";
var myArray = [];

addTodoHandler.addEventListener("click", addToDo);
listItens.addEventListener("click", handleTodo);
clear.onclick = removeCompleted;
completed.onclick = showItensComplete;
allItens.onclick = showAllItens;
active.onclick = showItensActive;

inputTodo.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    addTodoHandler.click();
  }
});

function addToDo() {
  var item = document.createElement("li");
  item.innerHTML = `
  <img class="img" src="./assets/images/icon-check.svg" alt="check" />
  <p>${inputTodo.value}</p>
  <img src="./assets/images/icon-cross.svg" class="delete-item" alt="delete-item" />`;

  if (inputTodo.value != "") {
    inputTodo.focus();
    item
      .querySelector("img")
      .setAttribute("id", `${Math.floor(Math.random() * 1000)}`);
    listItens.appendChild(item);
    itensleft.textContent = listItens.childNodes.length;
    inputTodo.value = "";
    creatObject(item);
  } else {
    window.alert("campo em branco");
  }
}

function creatObject(value) {
  var item = {
    checkImg: {
      id: value.children[0].getAttribute("id"),
      class: value.children[0].classList.value,
      alt: value.children[0].getAttribute("alt"),
      src: value.children[0].getAttribute("src"),
    },
    p: { value: value.children[1].innerText },
    deleteImg: {
      src: value.children[2].getAttribute("src"),
      class: value.children[2].getAttribute("class"),
      alt: value.children[2].getAttribute("alt"),
    },
  };
  myArray.push(item);
}

function handleTodo(event) {
  var selectItemClass = event.target.className;
  var completed = "img set";
  var incompleted = "img";

  switch (selectItemClass) {
    case "img":
      event.target.className = completed;
      changeClassInsideMyArray(event.target.id, completed);

      break;

    case "img set":
      event.target.className = incompleted;
      changeClassInsideMyArray(event.target.id, incompleted);

      break;
  }

  if (selectItemClass == "delete-item") {
    event.target.parentNode.remove();
    itensleft.textContent = listItens.childNodes.length;
  }
}
function changeClassInsideMyArray(id, value) {
  return myArray.map((item) => {
    if (item["checkImg"]["id"] == id) {
      return (item["checkImg"]["class"] = value);
    }
  });
}

function removeCompleted() {
  var completeItem = document.querySelectorAll(".img.set");

  for (let i = 0; i < completeItem.length; i++) {
    completeItem[i].parentNode.remove();
  }
  itensleft.textContent = listItens.childNodes.length;
}

function showItensComplete() {
  var complete = myArray.filter((item) => {
    return item.checkImg.class == "img set";
  });
  arrayTodo(complete);
  console.dir(complete);
}

function showAllItens() {
  arrayTodo(myArray);
  console.dir(myArray);
}

function showItensActive() {
  var incompeteTodo = myArray.filter((item) => {
    return item.checkImg.class == "img";
  });
  arrayTodo(incompeteTodo);
}

function arrayTodo(array) {
  while (listItens.children.length > 0) {
    listItens.firstChild.remove();
  }

  for (let item of array) {
    let creationOfliItem = document.createElement("li");
    creationOfliItem.innerHTML = `<img class="${item.checkImg.class}" src="${item.checkImg.src}" alt="${item.checkImg.alt}" />
      <p>${item.p.value}</p>
      <img src="${item.deleteImg.src}" class="${item.deleteImg.class}" alt="${item.deleteImg.alt}" />`;
    listItens.appendChild(creationOfliItem);
  }

  itensleft.textContent = array.length;
}
function arrayOfIds(target) {
  return target.childNodes[1].id;
}

buttonMode.addEventListener("click", () => {
  var root = document.documentElement;
  var theme =
    window.getComputedStyle(root).getPropertyValue("--light") === " "
      ? "dark"
      : "light";

  document.documentElement.classList.remove(theme);
  theme = theme === "dark" ? "light" : "dark";
  root.classList.add(theme);

  let sources = document.querySelectorAll("picture source");

  for (let source of sources) {
    source.setAttribute("media", `(prefers-color-scheme: ${theme})`);
  }
});

function changeBackgroundImage(e) {
  let imgDark = backgroundImage.children[0];
  let imgLight = backgroundImage.children[1];

  if (e.matches) {
    imgDark.setAttribute(
      "media",
      "(prefers-color-scheme: dark) and (max-width: 599px)"
    );
    imgDark.setAttribute("srcset", "./assets/images/bg-mobile-dark.jpg");
    imgLight.setAttribute("src", "./assets/images/bg-mobile-light.jpg");
  } else {
    imgDark.setAttribute(
      "media",
      "(prefers-color-scheme: dark) and (min-width: 599px)"
    );
    imgDark.setAttribute("srcset", "./assets/images/bg-desktop-dark.jpg");
    imgLight.setAttribute("src", "./assets/images/bg-desktop-light.jpg");
  }
}

changeBackgroundImage(mql);

mql.addEventListener("change", changeBackgroundImage);

if (mql2.matches) {
  circleDecoration.remove();
}
