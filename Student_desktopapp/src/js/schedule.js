const axios = require('axios');

var displayName = document.getElementById('display-name');
var showevent = document.getElementById("show-event");
var popup = document.getElementById("popup");
var span = popup.getElementsByTagName('span');
var examArray = [];
var eventArray = [];

axios({
        method: 'get',
        url: 'http://143.244.139.140:5000/api/student/exams/self',
        responseType: 'json',
        headers: {
            'Authorization': "BEARER " + sessionStorage.getItem('token'),
        }

    })
    .then((response) => {
        examArray = response.data
        addEvents(examArray);
        nextExam(examArray);


    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response)
            if (error.response.data.error = "TokenExpiredError: jwt expired") {
                ipc.send('timeOut');
            }

        };

    });

function createEvents() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 350,
        initialView: 'dayGridMonth',
        eventColor: 'orange',
        events: eventArray,
        //eventDisplay: 'block',
        eventClick: function(info) {
            var id = info.event.id
            span[0].innerHTML = examArray[id][0].exam
            span[1].innerHTML = examArray[id][1].course
            span[2].innerHTML = info.event.start
            span[3].innerHTML = examArray[id][1].duration
            span[4].innerHTML = examArray[id][0].room_name
            span[5].innerHTML = examArray[id][0].chief_invigilator
            span[6].innerHTML = examArray[id][0].invigilator
            displayName.value = sessionStorage.getItem('name')
            sessionStorage.setItem('roomName', examArray[id][0].room_name)
            sessionStorage.setItem('videoPath', examArray[id][0].recordedStudentVideosAt)
            showevent.click()

        },
        headerToolbar: {
            left: '',
            center: 'title',
            right: 'today prev,next',
        }
    });
    calendar.render();
};

function addEvents(array) {
    console.log(array)
    for (var i = 0; i < array.length; i++) {

        eventArray.push({ title: array[i][0].exam, start: array[i][1].startTime.split('Z')[0], id: i, allDay: false });
    }
    createEvents();
}

function joinExam() {
    sessionStorage.setItem('displayName', displayName.value);
    ipc.send('exam room')
}

/************** update next exam ************************/

function nextExam(array) {
    var now = new Date()
    var examIndex;
    var nextexam, exam;
    console.log(array)
    if (array.length == 0) {
        sessionStorage.setItem('nextExamAt', '-1');
        sessionStorage.setItem('nextExam', 'no exam');
        return
    }
    nextexam = new Date(array[0][1].startTime)

    for (var i = 0; i < array.length; i++) {
        exam = new Date(array[i][1].startTime)
        if (exam - now > 0 && exam < nextexam) {
            nextexam = exam;
            examIndex = i;
        }
    }

    sessionStorage.setItem('nextExamAt', nextexam / 1000);
    sessionStorage.setItem('nextExam', array[examIndex][0].exam)
}