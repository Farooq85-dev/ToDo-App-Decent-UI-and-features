//SignUp Form
function registerYourSelf() {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    //Email Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Password Regex
    let password = document.querySelector('#password').value;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    let confirmpassword = document.querySelector('#cpassword').value;
    let checkBox = document.getElementById('checkBox').checked;

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
    }
    else if (!checkBox) {
        Swal.fire({
            icon: "error",
            title: "Please accept our terms and conditions.",
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
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
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
        title: "Sorry, this feature is not available yet.",
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

//Add Task
function addTask() {
    let localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (!localStorageData) {
        Swal.fire({
            icon: "error",
            title: `Please Register YourSelf first.`,
        });
    }
    let name = localStorageData.name;
    let task = document.querySelector('#task').value;
    //Validation
    if (task === "") {
        Swal.fire({
            icon: "error",
            title: "Please write task title.",
        });
    } else {
        document.querySelector("#tasksAccount").innerHTML = `
        <p class="noTask" >Tasks of ${name}</p>
        `
        document.querySelector("#todo").innerHTML = `
        <div class="tasksback" id="tasksback">
        <div class="icons">
        <span class="taskTitle">${task}</span>
                            <ul>
                                <li><i style="cursor: pointer;" class="fa-solid fa-check" onclick="completeTask()";></i></i></li>
                                <li><i style="cursor: pointer;" class="fa-solid fa-pen" onclick="editTask()"></i></li>
                                <li><i style="cursor: pointer;" class="fa-regular fa-trash-can" onclick="deleteTask();"></i></li>
                                <li><i onclick="colorPicker();" style="cursor: pointer;"
                                        class="fa-solid fa-palette"></i></li>
                                <div id="colorPickerContainer">
                                    <div id="colorPicker">
                                        <div class="colorOption" style="background-color: black;"
                                            onclick="updateColor('black')"></div>
                                        <div class="colorOption" style="background-color: #4d0e63;"
                                            onclick="updateColor('#4d0e63')"></div>
                                        <div class="colorOption" style="background-color:  #98FF98;"
                                            onclick="updateColor(' #98FF98')"></div>
                                        <div class="colorOption" style="background-color:  #9c8533;"
                                            onclick="updateColor(' #9c8533')"></div>
                                        <div class="colorOption" style="background-color: #556B2F;"
                                            onclick="updateColor('#556B2F')"></div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>`;
    }
}

//Delete Task
function deleteTask() {
    document.querySelector("#todo").innerHTML = "";
    document.querySelector("#tasksAccount").innerHTML = "";
}

//Colo Picker Js
function colorPicker() {
    var colorPicker = document.getElementById('colorPicker');
    colorPicker.style.display = colorPicker.style.display === 'block' ? 'none' : 'block';
}

function updateColor(selectedColor) {
    document.getElementById('tasksback').style.backgroundColor = selectedColor;
    colorPicker();
}

//Edit Task
function editTask(editButton) {
    var editInput = document.querySelector('.editInput');
    // Focus on the input field for editing
    editInput.focus();
}

//After Check
function completeTask() {
    var taskContainer = document.getElementById("tasksback");
    var taskText = document.querySelector('.taskTitle');

    // Toggle the 'completed' class on the task container
    taskContainer.classList.toggle('completed');

    // Toggle the 'strikeThrough' class on the task text
    taskText.classList.toggle('strikeThrough');
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