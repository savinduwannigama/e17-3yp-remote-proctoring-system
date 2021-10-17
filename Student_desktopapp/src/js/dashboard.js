var examdetailsJSON = localStorage.getItem("examdetails");
var examArray = []

const examdetails = document.getElementById('sec-title-box').getElementsByTagName('span');


if (examdetailsJSON) {
    var examArray = JSON.parse(examdetailsJSON);
    makerecentlyAccessedList(examArray);
}


function makerecentlyAccessedList(array) {

    //add recently accessed exam details
    examdetails[0].innerHTML = examArray[0].roomName;
    examdetails[1].innerHTML = examArray[0].startTime;
    examdetails[2].innerHTML = examArray[0].endTime;
    examdetails[3].innerHTML = examArray[0].savedvideo;
    for (var j = 0; j < examArray[0].status.length; j++) {
        var timedif = document.createElement('p');
        timedif.innerHTML = examArray[0].status[j];
        examdetails[4].appendChild(timedif);
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
        list.appendChild(item);
    }

}


var btn = document.getElementById("recent-exams").getElementsByTagName('li')
var btncount = btn.length;
for (var i = 0; i < btncount; i += 1) {
    btn[i].onclick = function() {
        examdetails[0].innerHTML = examArray[this.id].roomName;
        examdetails[1].innerHTML = examArray[this.id].startTime;
        examdetails[2].innerHTML = examArray[this.id].endTime;
        examdetails[3].innerHTML = examArray[this.id].savedvideo;
        examdetails[4].innerHTML = '';
        for (var j = 0; j < examArray[this.id].status.length; j++) {
            var timedif = document.createElement('p');
            timedif.innerHTML = examArray[this.id].status[j];
            examdetails[4].appendChild(timedif);
        }
    }
}