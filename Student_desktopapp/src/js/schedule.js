var showevent = document.getElementById("show-event");
var showtitle = document.getElementById("show-title");
var showstarttime = document.getElementById("show-starttime");
var showendtime = document.getElementById("show-endtime");

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 350,
        initialView: 'dayGridMonth',
        eventColor: 'orange',
        events: [{
            title: "CO321",
            start: '2021-09-10T10:00:00',
            end: '2021-09-10T16:00:00',
            display: 'block',

        }, {
            title: "CO322",
            start: '2021-09-12T10:00:00',
            end: '2021-09-12T16:00:00',
            display: 'block',
        }],
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