//SignUp Form
function registerYourSelf() {
    let name = document.querySelector('#userNameS').value;
    let email = document.querySelector('#emailS').value;
    //Email Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Password Regex
    let password = document.querySelector('#passwordS').value;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    let confirmpassword = document.querySelector('#cPasswordS').value;

    //Validations
    if (name === "") {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please write UserName.",
        });
    } else if (email === "") {
        Swal.fire({
            icon: "error",
            title: "Please write email.",
        });
    } else if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid email.",
        });
    } else if (password === "") {
        Swal.fire({
            icon: "error",
            title: "Please write password.",
        });
    } else if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.",
        });
    } else if (confirmpassword === "") {
        Swal.fire({
            icon: "error",
            title: "Please type password.",
        });
    } else if (!passwordRegex.test(confirmpassword)) {
        Swal.fire({
            icon: "error",
            title: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.",
        });
    } else if (password !== confirmpassword) {
        Swal.fire({
            icon: "error",
            title: "Match password.",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Congratulations.",
            timer: 1000,
        });
        var userData = {
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        }
        localStorage.setItem("userData", JSON.stringify(userData));
        //Direction to LogIn Form
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    };
}

//LogIn Form
function logIn() {
    let name = document.querySelector("#userNameL").value;
    let password = document.querySelector("#passwordL").value;
    let localStorageData = JSON.parse(localStorage.getItem("userData"));

    //Validations
    if (name === "") {
        Swal.fire({
            icon: "error",
            title: "Plaese write UserName.",
        });
    } else if (localStorageData.name !== name) {
        Swal.fire({
            icon: "error",
            title: "Invalid UserName.",
        });
    } else if (password.value === "") {
        Swal.fire({
            icon: "error",
            title: "Please write password.",
        });
    } else if (localStorageData.password !== password) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password.",
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Congratulation ${name}.`,
            timer: 1000,
        });
        //Direction to ToDo
        setTimeout(() => {
            window.location.href = "todo.html";
        }, 1000);
    }
}

//Account Information in Progress
function accountInfornations() {
    Swal.fire({
        icon: "error",
        title: "Sorry, this feature is not available.",
    });
}

//LogOut
function logOut() {
    let localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (!localStorageData) {
        Swal.fire({
            icon: "error",
            title: `Please Register YourSelf first.`,
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `You have been LogOut SuccessFully.`,
            timer: 1000,
        });
        setTimeout(() => {
            localStorage.clear();
            window.location.href = "index.html";
        }, 1000);

    }
}


function addTask() {
    let localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (!localStorageData) {
        Swal.fire({
            icon: "error",
            title: `Please Register Yourself first.`,
        });
        return;
    }
    let name = localStorageData.name;
    let taskInput = document.querySelector('#task').value;
    if (taskInput === "") {
        Swal.fire({
            icon: "error",
            title: "Please add todo.",
        });
        return;
    }

    let taskContainer = document.createElement('div');
    taskContainer.classList.add('tasksback');
    taskContainer.innerHTML = `
        <div class="icons">
            <span class="taskTitle">${taskInput}</span>
            <ul>
                <li><i style="cursor: pointer;" class="fa-solid fa-check" onclick="completeTask(this.parentNode.parentNode.parentNode.parentNode);"></i></li>
                <li><i style="cursor: pointer;" class="fa-solid fa-pen" onclick="editTask(this.parentNode.parentNode.parentNode.parentNode);"></i></li>
                <li><i style="cursor: pointer;" class="fa-regular fa-trash-can"  onclick="deleteTask(this.parentNode.parentNode.parentNode.parentNode);"></i></li>
                <li><i  style="cursor: pointer;" class="fa-solid fa-palette" onclick="colorPicker(this.parentNode.parentNode.parentNode);"></i></li>
                <div class="colorPickerContainer">
                    <div class="colorPicker">
                        <div class="colorOption" style="background-color: black;" onclick="updateColor('black', this.parentNode.parentNode.parentNode.parentNode.parentNode);"></div>
                        <div class="colorOption" style="background-color: #4d0e63;" onclick="updateColor('#4d0e63', this.parentNode.parentNode.parentNode.parentNode.parentNode);"></div>
                        <div class="colorOption" style="background-color:  #6dba6d;" onclick="updateColor(' #6dba6d', this.parentNode.parentNode.parentNode.parentNode.parentNode);"></div>
                        <div class="colorOption" style="background-color:  #9c8533;" onclick="updateColor(' #9c8533', this.parentNode.parentNode.parentNode.parentNode.parentNode);"></div>
                        <div class="colorOption" style="background-color: #556B2F;" onclick="updateColor('#556B2F', this.parentNode.parentNode.parentNode.parentNode.parentNode);"></div>
                    </div>
                </div>
            </ul>
        </div>`;
    document.querySelector("#todo").appendChild(taskContainer);
    document.querySelector("#tasksAccount").innerHTML = `
        <p class="noTask" >Tasks of ${name}</p>
    `;
    document.querySelector('#task').value = "";

}

function delAll() {
    let tasksback = document.querySelector("#todo");
    if (!tasksback.innerHTML) {
        Swal.fire({
            icon: "error",
            title: `Please add todos first.`,
        });
        return;
    }
    tasksback.innerHTML = "";
    tasksAccount.innerHTML = "";
}

function deleteTask(taskDiv) {
    taskDiv.remove();
}

function colorPicker(taskDiv) {
    var colorPickerContainer = taskDiv.querySelector('.colorPickerContainer');
    colorPickerContainer.style.display = colorPickerContainer.style.display === 'block' ? 'none' : 'block';
}

function updateColor(selectedColor, taskDiv) {
    taskDiv.style.backgroundColor = selectedColor;
    var colorPickerContainer = taskDiv.querySelector('.colorPickerContainer');
    if (colorPickerContainer) {
        colorPickerContainer.style.display = 'none'; // Hide the color picker after selecting a color
    }
}

function editTask(taskDiv) {
    var taskTitle = taskDiv.querySelector('.taskTitle');
    var editTaskInput = document.querySelector('#editTaskInput');

    // Set the initial value of the input field to the current task title
    editTaskInput.value = taskTitle.textContent;

    // Open the modal
    $('#editTaskModal').modal('show');
}

function saveEditedTask() {
    var editTaskInput = document.querySelector('#editTaskInput');
    var newTitle = editTaskInput.value.trim();

    if (newTitle !== "") {
        // Update the task title
        var taskTitle = document.querySelector('.taskTitle');
        taskTitle.textContent = newTitle;

        // Close the modal
        $('#editTaskModal').modal('hide');
    } else {
        // Show an error message if the input is empty
        alert('Please enter a valid task title.');
    }
}

function completeTask(taskDiv) {
    taskDiv.classList.toggle('completed');
    var taskTitle = taskDiv.querySelector('.taskTitle');
    taskTitle.classList.toggle('strikeThrough');
}

//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}

var icon1 = document.querySelector("#icon1");
icon1 && icon1.addEventListener("click", () => {
    let passwordS = document.querySelector("#passwordS");
    if (passwordS.type === "password") {
        passwordS.type = "text";
        icon1.src = "/images/eye-regular.svg";
    } else {
        passwordS.type = "password";
        icon1.src = "/images/eye-slash-regular.svg";
    }
})

var icon2 = document.querySelector("#icon2");
icon2 && icon2.addEventListener("click", () => {
    let cPasswordS = document.querySelector("#cPasswordS");
    if (cPasswordS.type === "password") {
        cPasswordS.type = "text";
        icon2.src = "/images/eye-regular.svg";
    } else {
        cPasswordS.type = "password";
        icon2.src = "/images/eye-slash-regular.svg";
    }
})

var icon3 = document.querySelector("#icon3");
icon3 && icon3.addEventListener("click", () => {
    let passwordL = document.querySelector("#passwordL");
    if (passwordL.type === "password") {
        passwordL.type = "text";
        icon3.src = "/images/eye-regular.svg";
    } else {
        passwordL.type = "password";
        icon3.src = "/images/eye-slash-regular.svg";
    }
})
