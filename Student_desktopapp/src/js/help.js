var record = false;
const {
    ipcRenderer
} = require('electron')
const ipc = ipcRenderer

/************* online offline array ***************/
var roomInfoJSON = '{"name":"CO227-test"}';
var roomInfoArray = JSON.parse(roomInfoJSON);

var offlineStart = -1,
    offlineEnd = -1;
var statusArray = [];

var examdetails = {};


/**********************Date and Time **************/
const monthNames = [" Jan ", " Feb ", " Mar ", " Apr ", " May ", " June ",
    " July ", " Aug ", " Sep ", " Oct ", " Nov ", " Dec "
];

function display_date() {

    var x = new Date()
    var date = x.getDate() + monthNames[x.getMonth()] + x.getFullYear() + " " + x.getHours() + "-" + x.getMinutes();
    return date;
}

/************ jitsi room settings *********************/
examdetails['roomName'] = roomInfoArray.name;


const domain = 'meet.jit.si';
const options = {
    roomName: roomInfoArray.name,
    width: 750,
    height: 400,
    userInfo: {
        displayName: localStorage.getItem("username")
    },
    interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 2,
        DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
    },

    parentNode: document.querySelector('#meet')
};

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('span#errorMsg');
const downloadButton = document.querySelector('button#download');
const startButton = document.querySelector('button#start');
const status = document.querySelector('#status')
const goBack = document.querySelector('#goBack');


window.addEventListener('offline', () => {
    offlineStart = new Date();
    offlineEnd = 0;
    record = true;
    mediaRecorder.resume();
    status.style.background = "rgba(255, 0, 0, 0.678)";
    status.innerHTML = "You are offline. We keep recording"

})

window.addEventListener('online', () => {
    offlineEnd = new Date();
    statusArray.push(offlineStart + "-" + offlineEnd);
    mediaRecorder.pause();
    status.style.background = "#1eb119bd";
    status.innerHTML = "You are online."
})

goBack.addEventListener('click', () => {
    ipc.send("home");
})

downloadButton.addEventListener('click', () => {
    downloadButton.disabled = true;
    examdetails['endTime'] = new Date();
    status.style.background = "rgba(255, 0, 0, 0.678)";
    status.innerHTML = "Please wait...";
    var time = display_date();
    var participantName = localStorage.getItem("username")
    var name = participantName + " " + time;
    //time.toString().split(':').join('_');
    mediaRecorder.resume();
    stopRecording();

    if (offlineEnd == 0) {
        statusArray.push(offlineStart + "-");
    }
    examdetails['status'] = statusArray;
    additem(examdetails);

    setTimeout(function() {

        if (record) {
            const blob = new Blob(recordedBlobs, {
                type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);
            ipc.send("download", {
                url: url,
                fileName: name
            })

            ipc.on("done", () => {
                ipc.send('home');
            })

        } else {
            ipc.send('home');
        }

    }, 3000)

});

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function startRecording() {
    recordedBlobs = [];
    let options = {
        mimeType: 'video/webm;codecs=vp9,opus'
    };
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
    mediaRecorder.pause();
    downloadButton.disabled = false;
}

function stopRecording() {
    mediaRecorder.stop();
}

function handleSuccess(stream) {
    window.stream = stream;
    startRecording();

}

async function init(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

startButton.addEventListener('click', async() => {

    if (!(navigator.onLine)) {
        status.style.background = "rgba(255, 0, 0, 0.678)";
        status.innerHTML = "You are offline."
        return;
    }
    startButton.disabled = true;
    goBack.style.display = "none";
    const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
    const constraints = {
        audio: {
            echoCancellation: {
                exact: hasEchoCancellation
            }
        },
        video: {
            width: 1280,
            height: 720
        }
    };
    console.log('Using media constraints:', constraints);
    const api = new JitsiMeetExternalAPI(domain, options);
    await init(constraints);
    examdetails['startTime'] = new Date();

});



/****************** recently acced exams *******************/
function additem(data) {

    var items = JSON.parse(localStorage.getItem('examdetails'));
    //var data = document.getElementById('data').value;

    if (!items) {
        localStorage.setItem('examdetails', JSON.stringify([data]));
    } else {
        items.unshift(data);
        localStorage.setItem('examdetails', JSON.stringify(items));
        if (items.length === 11) {
            items.pop(); //the last item in the array is removed. So length is 3
            localStorage.setItem('examdetails', JSON.stringify(items));
        }
    }

}