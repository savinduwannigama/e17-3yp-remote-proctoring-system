const axios = require('axios');

var showevent = document.getElementById("show-event");
var showtitle = document.getElementById("show-title");
var showstarttime = document.getElementById("show-starttime");
var showendtime = document.getElementById("show-endtime");

var examArray = [{
    title: "CO321",
    start: '2021-11-10T10:00:00',
    end: '2021-11-10T16:00:00',
    display: 'block',
    id: 'CO321exam',

}, {
    title: "CO322",
    start: '2021-11-12T10:00:00',
    end: '2021-11-12T16:00:00',
    display: 'block',
}]

axios({
        method: 'get',
        url: 'http://143.244.139.140:5000/api/student/exams/self',
        responseType: 'json',
        headers: {
            'Authorization': "BEARER " + sessionStorage.getItem('token'),
        }

    })
    .then((response) => {
        console.log(response)
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response)

        };
    });

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 350,
        initialView: 'dayGridMonth',
        eventColor: 'orange',
        events: examArray,
        eventClick: function(info) {
            showtitle.innerHTML = info.event.title
            showstarttime.innerHTML = info.event.start
            showendtime.innerHTML = info.event.end
            showevent.click()

        },
        headerToolbar: {
            left: '',
            center: 'title',
            right: 'today prev,next',
        }
    });
    calendar.render();
});