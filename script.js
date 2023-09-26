'use strict';

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const alertModal = document.getElementById("myModal");
const btnClose = document.querySelector(".modal-button");
const overlay = document.querySelector(".overlay");

// open modal window
const openModalWindow = function () {
    alertModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

// close modal window
const closeModalWindow = function () {
    alertModal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnClose.addEventListener('click', closeModalWindow);

overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && !alertModal.classList.contains("hidden")) {
        closeModalWindow();
    }
});

// input tasks to the list
function addTask() {
    if (inputBox.value === '') {
        openModalWindow();
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

document.addEventListener('keydown', function (enter) {
    if (enter.key === "Enter") {
        addTask();
    }
});

// remove tasks when clicked
listContainer.addEventListener("click", function (checkTask) {
    if (checkTask.target.tagName === "LI") {
        checkTask.target.classList.toggle("checked");
        saveData();
    } else if (checkTask.target.tagName === "SPAN") {
        checkTask.target.parentElement.remove();
        saveData();
    }
}, false);


// save data in the browser
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();