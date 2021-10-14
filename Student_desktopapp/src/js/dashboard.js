var examdetailsJSON = localStorage.getItem("examdetails");
var examArray = []

const examNamedetails = document.getElementById('examName');
const examStartdetails = document.getElementById('examStart');
const examEnddetails = document.getElementById('examEnd');
const examStatusdetails = document.getElementById('examstatus');

if (examdetailsJSON) {
    var examArray = JSON.parse(examdetailsJSON);
    makerecentlyAccessedList(examArray);
}


function makerecentlyAccessedList(array) {

    //add recently accessed exam details
    examNamedetails.innerHTML = examArray[0].roomName;
    examStartdetails.innerHTML = examArray[0].startTime;
    examEnddetails.innerHTML = examArray[0].endTime;

    for (var j = 0; j < examArray[0].status.length; j++) {
        var timedif = document.createElement('p');
        timedif.innerHTML = examArray[0].status[j];
        examStatusdetails.appendChild(timedif);
    }

    // Create the list element:
    var list = document.getElementById('recent-exams');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var examName = document.createElement('p');
        var examStart = document.createElement('p');
        // Set its contents:
        item.setAttribute("id", i.toString());
        examName.innerHTML = array[i].roomName;
        examStart.innerHTML = array[i].startTime;
        item.appendChild(examName);
        item.appendChild(examStart);

        // for (var j = 0; j < array[i].status.length; j++) {
        //     var timedif = document.createElement('li');
        //     timedif.innerHTML = array[i].status[j];
        //     examStatus.appendChild(timedif);
        // }
        // examStatus.style.fontSize = '10px';
        // item.appendChild(examStatus);
        // Add it to the list:
        list.appendChild(item);
    }

}


var btn = document.getElementById("recent-exams").getElementsByTagName('li')
var btncount = btn.length;
for (var i = 0; i < btncount; i += 1) {
    btn[i].onclick = function() {
        examNamedetails.innerHTML = examArray[this.id].roomName;
        examStartdetails.innerHTML = examArray[this.id].startTime;
        examEnddetails.innerHTML = examArray[this.id].endTime;
        examStatusdetails.innerHTML = '';
        for (var j = 0; j < examArray[this.id].status.length; j++) {
            var timedif = document.createElement('p');
            timedif.innerHTML = examArray[this.id].status[j];
            examStatusdetails.appendChild(timedif);
        }
    }
}