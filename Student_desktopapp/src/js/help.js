const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const date = require('date-and-time');
var api;


/****************** variables **********************/

const userName = sessionStorage.getItem("name");
const userEmail = sessionStorage.getItem("email");

var record = false;

/************* online offline array ***************/
var roomInfoJSON = '{"name":"CO323 MID"}';
var roomInfoArray = JSON.parse(roomInfoJSON);

var offlineStart = -1,
    offlineEnd = -1;
var statusArray = [];

var examdetails = {};


/************ jitsi room settings *********************/

examdetails['roomName'] = roomInfoArray.name;


const domain = 'meet.jit.si';
const options = {
    roomName: roomInfoArray.name,
    width: 750,
    height: 400,
    userInfo: {
        email: userEmail,
        displayName: userName,
    },
    configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        toolbarButtons: ['camera', 'chat',
            'microphone', 'raisehand'
        ],

    },
    interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 1,
        DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
        APP_NAME: 'Connexa',
        DEFAULT_LOGO_URL: '',

    },

    parentNode: document.querySelector('#meet')
};



/************************ Recordings *************************/

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('span#errorMsg');
const downloadButton = document.querySelector('button#download');
const startButton = document.querySelector('button#start');
const status = document.querySelector('#status')
const goBack = document.querySelector('#goBack');


window.addEventListener('offline', () => {
    offlineStart = date.format(new Date(), 'MMMDD HH-mm-ss')
    offlineEnd = 0;
    record = true;
    mediaRecorder.resume();
    status.style.background = "rgba(255, 0, 0, 0.678)";
    status.innerHTML = "You are offline. We keep recording"

})

window.addEventListener('online', () => {
    offlineEnd = date.format(new Date(), 'MMMDD HH-mm-ss')
    statusArray.push(offlineStart + " to " + offlineEnd);
    mediaRecorder.pause();
    status.style.background = "#1eb119bd";
    status.innerHTML = "You are online."
})

goBack.addEventListener('click', () => {
    ipc.send("home");
})

downloadButton.addEventListener('click', () => {
    downloadButton.disabled = true;
    api.dispose();
    examdetails['endTime'] = date.format(new Date(), 'DD MMM YYYY HH-mm-ss');

    var time = date.format(new Date(), 'DD MMM YYYY HH_mm_ss');
    var name = localStorage.getItem('email') + time;
    mediaRecorder.resume();
    stopRecording();

    if (offlineEnd == 0) {
        statusArray.push(offlineStart + " to -");
    }
    examdetails['status'] = statusArray;
    additem(examdetails);

    setTimeout(function() {

        if (record) {
            const blob = new Blob(recordedBlobs, {
                type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);

            status.innerHTML = "Video Saving...";
            status.style.background = "rgba(255, 0, 0, 0.678)";

            ipc.send("download", {
                url: url,
                fileName: name
            })

            ipc.on("done", () => {
                ipc.send('dashboard');
            })

        } else {
            status.innerHTML = "Please wait...";
            status.style.background = "rgba(255, 0, 0, 0.678)";
            ipc.send('dashboard');
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
    const constraints = {
        audio: {
            echoCancellation: {
                exact: true,
            }
        },
        video: {
            width: 640,
            height: 360,
            frameRate: { max: 10 },
        }
    };
    console.log('Using media constraints:', constraints);

    //jitsi meeting starts here
    api = new JitsiMeetExternalAPI(domain, options);
    await init(constraints);
    examdetails['startTime'] = date.format(new Date(), 'DD MMM YYYY HH-mm-ss')
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