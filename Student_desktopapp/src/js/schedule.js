var record = false;
const {
    ipcRenderer
} = require('electron')
const ipc = ipcRenderer

const domain = 'meet.jit.si';
const options = {
    roomName: 'CO227-test',
    width: 750,
    height: 400,
    userInfo: {
        displayName: 'sashini'
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
    record = true;
    mediaRecorder.resume();
    status.style.background = "rgba(255, 0, 0, 0.678)";
    status.innerHTML = "You are offline. We keep recording"

})

window.addEventListener('online', () => {
    mediaRecorder.pause();
    status.style.background = "#1eb119bd";
    status.innerHTML = "You are online."
})

goBack.addEventListener('click', () => {
    ipc.send("home");
})
downloadButton.addEventListener('click', () => {
    downloadButton.disabled = true;
    status.style.background = "rgba(255, 0, 0, 0.678)";
    status.innerHTML = "Please wait...";
    var time = new Date();
    var name = time.toString().split(':').join('_');
    mediaRecorder.resume();
    stopRecording();

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
        }
        ipc.on("done", () => {
            ipc.send('home');
        })
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

    startButton.disabled = true;
    downloadButton.disabled = false;
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
});