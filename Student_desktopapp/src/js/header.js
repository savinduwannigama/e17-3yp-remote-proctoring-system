const { ipcRenderer } = require('electron')
const ipc = ipcRenderer


const date = require('date-and-time');

var btn = document.getElementById("list").getElementsByTagName('li')
var btncount = btn.length;
for (var i = 0; i < btncount; i += 1) {
    btn[i].onclick = function() {
        ipc.send(this.id);
    }
}

function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh);
    mybattery = setTimeout('battery()', refresh);


}

/**********************Date and Time **************/
const monthNames = [" Jan ", " Feb ", " Mar ", " Apr ", " May ", " June ",
    " July ", " Aug ", " Sep ", " Oct ", " Nov ", " Dec "
];

function display_date() {

    var x = new Date()
    var date = x.getDate() + monthNames[x.getMonth()] + x.getFullYear();
    return date;
}


/***************** current time ******************/

function display_ct() {
    var x = new Date()
    var hours = x.getHours();
    var min = x.getMinutes();
    var sec = x.getSeconds();
    document.getElementById('currenttime').innerHTML = hours + " : " + min + " : " + sec;
    display_c();
}



/************* battery percentage***************/
function battery() {

    const batteryLevelOutput = document.getElementById('batteryLevelOutput');
    const batteryIndicator = document.getElementById('indicator');
    navigator.getBattery().then(battery => {
        updateBattery();

        battery.addEventListener('chargingchange', () => {
            updateBattery()
        });
        battery.addEventListener('levelchange', () => {
            updateBattery()
        });

        function updateBattery() {
            batteryLevelOutput.innerHTML = `${parseInt(battery.level*100)}%`;
            batteryIndicator.style.width = `${parseInt(battery.level*100)}%`;
            if (battery.charging) {
                batteryIndicator.className = 'charging';
            } else if (battery.level * 100 > 70) {
                batteryIndicator.className = 'battery70';
            } else if (battery.level * 100 > 50) {
                batteryIndicator.className = 'battery50';
            } else if (battery.level * 100 > 20) {
                batteryIndicator.className = 'battery20';
            } else {
                batteryIndicator.className = 'batterylow';


            }
        }
    });

}


/* online/offline */
window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('online', updateOnlineStatus);


function updateOnlineStatus(event) {
    var timeindicator = document.getElementById("timeindicator");
    var status = document.getElementById("status");
    var time = document.getElementById("timestamp");

    var condition = navigator.onLine ? "online" : "offline";
    document.getElementById("avatar").className = condition;


    if (condition == "offline") {
        status.style.display = "";
        time.style.display = "none";
        timeindicator.style.display = "none";

        status.style.background = "rgb(187, 10, 10)";
        status.innerHTML = "YOU ARE OFFLINE !";

    } else {
        status.style.background = "#63cc26";
        status.innerHTML = "YOU ARE ONLINE !";
        setTimeout(function() {
            status.style.display = "none";
            time.style.display = "";
            timeindicator.style.display = ""
        }, 3000)


    }
}

window.addEventListener("load", function() {
    var condition = navigator.onLine ? "online" : "offline";
    document.getElementById("avatar").className = condition;

    var time = document.getElementById("timestamp");
    var timeindicator = document.getElementById("timeindicator");
    var status = document.getElementById("status");

    if (condition == "offline") {
        status.style.display = "";
        time.style.display = "none";
        timeindicator.style.display = "none";

        status.style.background = "rgb(187, 10, 10)";
        status.innerHTML = "YOU ARE OFFLINE";
    }
})



/* update user details */
/*fetch("json/user_details.json").then(response => response.json()).then(data => {
    document.getElementById("user_name").innerHTML = data[0].name
    document.getElementById("avatar").src = data[0].avatar
})*/


var username = document.getElementById("user_name");
username.innerHTML = sessionStorage.getItem("name");


if (typeof(Storage) !== "undefined" && localStorage.useravatar) {
    var useravatar = document.getElementById("avatar");
    useravatar.src = localStorage.getItem("useravatar");
}


/******************* set dark/light mode ************************/
if (typeof(Storage) !== "undefined" && localStorage.theme) {
    var Theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', Theme);
}


/************************** close popup**************************/
function closePopup() {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = '#';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
    }, 200);
}

function closenRefresh() {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = '#';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        location.reload();
    }, 200);

}

function refresh() {
    location.reload();
}