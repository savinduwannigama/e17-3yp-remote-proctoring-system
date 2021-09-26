const { ipcRenderer } = require('electron')
const { stat } = require('original-fs')
const ipc = ipcRenderer

const contextMenuBtn = document.getElementById("show_notifications")
contextMenuBtn.addEventListener('click', () => {
    ipc.send('notification')
})

const MenuBtn = document.getElementById("badge")
MenuBtn.addEventListener('click', () => {
    ipc.send('notification')
})

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
    var hours = x.getHours();
    var min = x.getMinutes();
    var sec = x.getSeconds();
    document.getElementById('time').innerHTML = hours + " : " + min + " : " + sec;
    document.getElementById("date").innerHTML = x.getDate() + monthNames[x.getMonth()] + x.getFullYear();
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

        status.style.background = "rgba(255, 0, 0, 0.678)";
        status.innerHTML = "YOU ARE OFFLINE !";

    } else {
        status.style.background = "#1eb119bd";
        status.innerHTML = "YOU ARE ONLINE !";
        setTimeout(function() {
            status.style.display = "none";
            time.style.display = "";
            timeindicator.style.display = ""
        }, 3000)


    }
}

/*window.addEventListener("load", function() {
    var condition = navigator.onLine ? "online" : "offline";
    document.getElementById("avatar").className = condition;
    var status = document.getElementById("status");
    if (condition == "offline") {
        status.style.background = "linear-gradient(to right, rgba(255, 0, 0, 0) 20%, red 80%)";
        status.innerHTML = "YOU ARE OFFLINE";
    }
})*/



/* update user details */
fetch("json/user_details.json").then(response => response.json()).then(data => {
    document.getElementById("user_name").innerHTML = data[0].name
    document.getElementById("avatar").src = data[0].avatar
})