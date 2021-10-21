var serverSelection = document.getElementById('server-selection')
var connections = document.getElementById('connections')
var newServer = document.getElementById('new-server')
var addBtn = document.getElementById('addbtn')
var serverName = document.getElementById('server-name')
var serverIP = document.getElementById('server-url')
var add = document.getElementById('add')
var cancle = document.getElementById('cancle')
var serverSelectionbtn = document.getElementById('server-connection')
var displayName = document.getElementById('display-server');
var delItem;
var selected;

if (localStorage.serverName) {
    displayName.innerHTML = localStorage.getItem('serverName')
} else {
    displayName.innerHTML = 'click here to change the server'
}

function refresh() {
    location.reload();
}

serverSelectionbtn.addEventListener('click', () => {
    serverSelection.style.display = 'block'
})


const fs = require("fs");
jsonReader("./src/json/user_servers.json", (err, customer) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    var servers = Object.keys(customer)
    console.log(servers)
    for (var i = 0; i < servers.length; i++) {
        connections.innerHTML += `<div class='item'>
       
        <p class='serverinfo btn'>${servers[i]}</p>
        <button class="delete"><i class='bi bi-trash-fill'></i></button>
        <span>${customer[servers[i]]}</span>
        </div>`;
    }
    delItem = document.querySelectorAll('.delete');
    for (var i = 0; i < delItem.length; i++) {
        delItem[i].onclick = function() {
            this.parentNode.remove();
            deleteItem(this.parentNode.childNodes[1].innerHTML);
        }
    }

    selected = document.querySelectorAll('.serverinfo');
    for (var i = 0; i < selected.length; i++) {
        selected[i].onclick = function() {
            localStorage.setItem('serverName', this.parentNode.childNodes[1].innerHTML);
            localStorage.setItem('serverIP', this.parentNode.childNodes[5].innerHTML);
            change();
        }
    }

});

var serverdiv = document.getElementById("server-selection")

function changeServer() {
    serverdiv.style.display = 'block';
}

function change() {
    displayName.innerHTML = localStorage.getItem('serverName')
    serverdiv.style.display = 'none';
    document.getElementById('log-error').innerHTML = ''
    document.getElementById('reg-error').innerHTML = ''
}

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

addBtn.addEventListener('click', () => {
    newServer.style.display = 'block'
})
cancle.addEventListener('click', () => {
    newServer.style.display = 'none'
})

add.addEventListener('click', () => {
    if (serverName.value && serverIP.value) {
        connections.innerHTML += `<div class='item'>
               
                <p class='serverinfo btn'>${serverName.value}</p>
                <button class="delete"><i class='bi bi-trash-fill'></i></button>
                <span>${serverIP.value}</span>
                </div>`;
    }
    cancle.click();

    addItem(serverName.value, serverIP.value);

    delItem = document.querySelectorAll('.delete');
    for (var i = 0; i < delItem.length; i++) {
        delItem[i].onclick = function() {
            this.parentNode.remove();
            deleteItem(this.parentNode.childNodes[1].innerHTML);
        }
    }

    selected = document.querySelectorAll('.serverinfo');
    for (var i = 0; i < selected.length; i++) {
        selected[i].onclick = function() {
            localStorage.setItem('serverName', this.parentNode.childNodes[1].innerHTML);
            localStorage.setItem('serverIP', this.parentNode.childNodes[5].innerHTML);
            change();
        }
    }
})


function addItem(key, value) {
    jsonReader("./src/json/user_servers.json", (err, customer) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        customer[key] = value;
        fs.writeFile("./src/json/user_servers.json", JSON.stringify(customer), err => {
            if (err) console.log("Error writing file:", err);
        });
    });
}


function deleteItem(key) {
    jsonReader("./src/json/user_servers.json", (err, customer) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        delete customer[key];
        fs.writeFile("./src/json/user_servers.json", JSON.stringify(customer), err => {
            if (err) console.log("Error writing file:", err);
        });
    });
}