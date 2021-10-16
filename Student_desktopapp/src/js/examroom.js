const { ipcRenderer } = require('electron')
const date = require('date-and-time');
const ipc = ipcRenderer


var api;
var savedVideo = 'No saved video'

/****************** variables **********************/
const roomName = sessionStorage.getItem('roomName');
const displayName = sessionStorage.getItem("displayName");
const userEmail = sessionStorage.getItem("email");

var record = false;

/************* online offline array ***************/

var offlineStart = -1,
    offlineEnd = -1;
var statusArray = [];
var examdetails = {};


/************ jitsi room configurations *********************/

examdetails['roomName'] = "roomName";


const domain = 'meet.jit.si';
const options = {
    roomName: "roomName 3585",
    width: 800,
    height: 480,
    userInfo: {
        email: userEmail,
        displayName: displayName,
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
const status = document.querySelector('#status')


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

downloadButton.addEventListener('click', () => {
    downloadButton.disabled = true;
    api.dispose();
    examdetails['endTime'] = date.format(new Date(), 'DD MMM YYYY HH-mm-ss');

    if (record) {
        var time = date.format(new Date(), 'DD MMM YYYY HH_mm_ss');
        savedVideo = localStorage.getItem('email') + time;
    }

    mediaRecorder.resume();
    stopRecording();

    if (offlineEnd == 0) {
        statusArray.push(offlineStart + " to -");
    }
    examdetails['status'] = statusArray;
    examdetails['savedvideo'] = savedVideo;
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


/****************** join to the exam room **************************/

document.addEventListener('DOMContentLoaded', async() => {
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