const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const contextMenuBtn = document.getElementById("show_notifications")
contextMenuBtn.addEventListener('click', () => {
    ipc.send('show-context-menu')
})

const MenuBtn = document.getElementById("badge")
MenuBtn.addEventListener('click', () => {
    ipc.send('show-context-menu')
})



function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
    mybattery = setTimeout('battery()', refresh)

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
            udateBattery()
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