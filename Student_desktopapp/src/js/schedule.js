const axios = require('axios');

var showevent = document.getElementById("show-event");
var popup = document.getElementById("popup");
var span = popup.getElementsByTagName('span')

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
            span[0].innerHTML = info.event.title
            span[1].innerHTML = info.event.start
            span[2].innerHTML = info.event.end
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