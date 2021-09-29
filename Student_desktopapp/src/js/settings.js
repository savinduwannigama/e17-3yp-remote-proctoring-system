/*global media recorder */

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');

recordButton.addEventListener('click', () => {
    if (recordButton.textContent === 'Record') {
        startRecording();
    } else {
        stopRecording();
        recordButton.textContent = 'Record';
        playButton.disabled = false;

    }
});


playButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs, {
        type: 'video/webm'
    });
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
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
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;

    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
}

function handleSuccess(stream) {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;

    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
}

async function init(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        console.error('navigator.getUserMedia error:', e);
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}


document.querySelector('#start').addEventListener('click', async() => {
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
    await init(constraints);

});

document.querySelector('#close').addEventListener('click', async() => {
    const video = document.querySelector('video#gum');
    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop());
    recordedVideo.pause();
    recordedVideo.currentTime = 0;
    recordedVideo.srcObject = null;

});



/************ change avatar image ******************/
const img = document.getElementById("cards");
const def = document.getElementById("defavatar");

img.addEventListener('click', function(event) {
    var isImg = event.target.nodeName === 'IMG';
    if (isImg) {
        def.src = event.target.src;
    }

});

document.getElementById("changeavtr").addEventListener("click", () => {
    localStorage.setItem("useravatar", def.src);
})


/********* toggle dark/light mode *************/

var toggleSwitch = document.querySelector('.toggle-btn input[type="checkbox"]');

if (typeof(Storage) !== "undefined" && localStorage.theme) {
    var currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);





/*********** user name ****************/


function countlength() {
    var name = document.getElementById("name");
    var remaininglength = document.getElementById("namelength")

    var length = name.value.length;
    var left = 25 - length;
    remaininglength.innerHTML = left.toString() + "/25"

}

if (typeof(Storage) !== "undefined" && localStorage.username) {
    var username = document.getElementById("name");
    username.defaultValue = localStorage.getItem("username");
}


document.getElementById("entername").addEventListener("click", () => {

    var newname = document.getElementById("name").value;
    if (newname.length != 0) {
        localStorage.setItem("username", newname);
    }

})