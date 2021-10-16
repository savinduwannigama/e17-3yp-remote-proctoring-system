const axios = require('axios');
const datentime = require('date-and-time');

var displayName = document.getElementById('display-name');
var showevent = document.getElementById("show-event");
var popup = document.getElementById("popup");
var span = popup.getElementsByTagName('span');
var examArray = [];
var eventArray = [];
var nextExam;

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
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response)

        };
        if (error.response.data.error = "TokenExpiredError: jwt expired") {
            ipc.send('timeOut');
        }
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
    array[0][1].startTime
    for (var i = 0; i < array.length; i++) {
        eventArray.push({ title: array[i][0].exam, start: array[i][1].startTime.split('Z')[0], id: i });
    }
    createEvents();
}

function joinExam() {
    sessionStorage.setItem('displayName', displayName.value);
    ipc.send('exam room')
}