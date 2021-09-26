const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

var check = document.getElementById("switch")
check.addEventListener('change', function() {
    if (!(this.checked)) {
        setTimeout(function() {
            ipc.send('Login');
        }, 500)
    }
});


/****** change place holder color to red ***************/
function changePlaceholderColor(textBoxes) {
    for (var i = 0; i < textBoxes.length; i++) {
        if (textBoxes[i].type == "text" || textBoxes[i].type == "password") {
            if (!textBoxes[i].value) {
                textBoxes[i].className += " Red";
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

var login = document.getElementById("register");

login.addEventListener('click', function(e) {
    e.preventDefault()
    OK = "true"

    var textBoxes = document.getElementsByTagName("input");
    var email = document.getElementById("email");
    if (!(validateEmail(email.value))) {
        email.value = "";
        email.placeholder = "Enter a valid Email";
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    var password = document.getElementById("password");
    if (!(validatePassword(password))) {
        changePlaceholderColor(textBoxes);
        OK = "false";
    }

    var confirmpassword = document.getElementById("confirmpassword");
    if (confirmpassword.value.length == 0) {
        confirmpassword.placeholder = "Re-enter your password"
        changePlaceholderColor(textBoxes);
        OK = "false";
    }
    if (password.value != confirmpassword.value) {
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

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function(e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});