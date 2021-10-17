var fs = require('fs');
var files = fs.readdirSync('src/recordedVideo');
var list = document.getElementById('saved-files');

const errorMsg = document.getElementById('errorMsg');
const uploadStatus = document.getElementById('uploadStatus');
const uploadbtn = document.getElementById('uploadbtn')
const canclebtn = document.getElementById('uploadcancle')

for (var i = 0; i < files.length; i++) {
    var item = document.createElement('p');
    item.setAttribute("id", i.toString());
    item.innerHTML = files[i];
    list.appendChild(item);
}


var link = document.getElementById("show")
var btn = document.getElementById("saved-files").getElementsByTagName('p')
var data = document.getElementById("data").getElementsByTagName('span')
var btncount = btn.length;

for (var i = 0; i < btncount; i += 1) {
    btn[i].onclick = function() {
        var video = document.getElementById(this.id);
        fs.stat('src/recordedVideo/' + video.innerHTML, (err, stats) => {
            data[0].innerHTML = video.innerHTML;
            data[1].innerHTML = stats.birthtime;
            data[2].innerHTML = Math.round(stats.size / 10000) / 100;
            console.log(navigator.connection.downlink);
        });
        link.click()
    }
}

function cancle() {
    uploadStatus.style.display = 'none'
    uploadbtn.disabled = false;
    errorMsg.innerHTML = '';
    uploadStatus.src = '';
    closePopup();
    setTimeout(() => {
        location.reload();
    }, 200);

}

function upload() {
    if (!(navigator.onLine)) {
        closePopup();
        return;
    }

    uploadbtn.disabled = true;
    canclebtn.disabled = true;
    var filename = document.getElementById('filename').innerHTML;
    errorMsg.innerHTML = 'Uploading....';
    uploadStatus.style.display = 'block'
    uploadStatus.src = 'img/icons/uploading.gif';

    ipc.send("googleDriveUpload", {
        fileName: filename,
    })

    ipc.on("done", async(event, { errormsg }) => {
        canclebtn.disabled = false;
        if (errormsg == 'noError') {
            errorMsg.innerHTML = "Video Uploaded Successfully";
            uploadStatus.src = 'img/icons/success.png'

            fs.unlink('src/recordedVideo/' + filename, function(err) {
                console.log(err);

            });
        } else {
            errorMsg.innerHTML = errormsg;
            uploadStatus.src = 'img/icons/fail.png'

        }

    })
}