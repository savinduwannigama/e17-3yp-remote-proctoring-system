const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const textBoxes = document.getElementsByTagName("input");

var check = document.querySelector("input[name=checkbox]");

var loginpage = document.getElementById('sign-in');
var regpage = document.getElementById('sign-up')

check.addEventListener('change', function() {
    if (this.checked) {
        setTimeout(function() {
            resetPlaceholder(textBoxes);
            loginpage.style.display = 'none';
            regpage.style.display = 'block'
        }, 300)

    } else {
        setTimeout(function() {
            resetPlaceholder(textBoxes);
            loginpage.style.display = 'block';
            regpage.style.display = 'none'
        }, 300)
    }
});


/****** change place holder color to red ***************/
/* see the loginpage.css for the css */
function changePlaceholderColor(textBoxes) {
    for (var i = 0; i < textBoxes.length; i++) {
        if (textBoxes[i].type == "text" || textBoxes[i].type == "password") {
            if (!textBoxes[i].value) {
                textBoxes[i].className = "user-input Red";
            }
        }
    }
}

function resetPlaceholder(textBoxes) {
    for (var i = 0; i < textBoxes.length; i++) {
        if (textBoxes[i].type == "text" || textBoxes[i].type == "password") {
            if (!textBoxes[i].value) {
                textBoxes[i].className = "user-input Gray";
            }
        }
    }
}

/********* user input validation ***********/
function validatePassword(p) {

    if (p.value.length == 0) {
        return false
    }
    if (p.value.length < 8) {
        p.value = "";
        p.placeholder = "Should contain at least 8 characters";
        return false
    }
    if (p.value.search(/[a-z]/i) < 0) {
        p.value = "";
        p.placeholder = "Should contain at least one letter";
        return false
    }
    if (p.value.search(/[0-9]/) < 0) {
        p.value = "";
        p.placeholder = "Should contain at least one digit";
        return false
    }
    return true;
}

function validateEmail(e) {
    if (e.length > 320) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e).toLowerCase());
}

/************** check user input before login ******************/



var login = document.getElementById("login");
var OK;
login.addEventListener('click', function(e) {
    e.preventDefault()
    OK = "true"


    var logemail = document.getElementById("log-email");
    if (!(validateEmail(logemail.value))) {
        logemail.value = "";
        logemail.placeholder = "Enter a valid Email";
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    var logpassword = document.getElementById("log-password");
    if (!(validatePassword(logpassword))) {
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    if (OK == "true") {
        ipc.send('home')
    }

})

/************** registration validation ****************/

var register = document.getElementById("register");

register.addEventListener('click', function(e) {
    e.preventDefault()
    OK = "true"

    var regemail = document.getElementById("reg-email");
    if (!(validateEmail(regemail.value))) {
        regemail.value = "";
        regemail.placeholder = "Enter a valid Email";
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    var regpassword = document.getElementById("reg-password");
    var confirmpassword = document.getElementById("confirm-password");

    if (!(validatePassword(regpassword))) {
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    if (confirmpassword.value.length == 0) {
        confirmpassword.placeholder = "Re-enter your password"
        changePlaceholderColor(textBoxes);
        OK = "false";
    }
    if (regpassword.value != confirmpassword.value) {
        confirmpassword.value = ""
        confirmpassword.placeholder = "Passwords doesn't match"
        changePlaceholderColor(textBoxes);
        OK = "false";
    }


    if (OK == "true") {
        ipc.send('Authentication')
    }

})

/**************** toggle password **************/


function togglePassword(id, eyeid) {
    var password = document.getElementById(id);
    var eye = document.getElementById(eyeid);
    var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    eye.classList.toggle('bi-eye');
}



/*****************Remember me***********************/
const rmCheck = document.getElementById("staylogged"),
    emailInput = document.getElementById("log-email");

if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.email;
} else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
}

function lsRememberMe() {
    if (rmCheck.checked && emailInput.value !== "") {
        localStorage.email = emailInput.value;
        localStorage.checkbox = rmCheck.value;
    } else {
        localStorage.email = "";
        localStorage.checkbox = "";
    }
}