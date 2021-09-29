import React,{Component} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../css/Schedule.css'
import Overlay from './Overlay.js'
export default class Calendar extends Component {
    handleEventClick = (clickInfo) => {
        if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }
     }
    
    render(){
       
        return (
            <div className="main-box">
               <FullCalendar
                    plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      }}
                    events={[
                        { title: 'CO321 MID', start:  '2021-09-28T02:30:00',end:'2021-09-28T05:30:00',allDay: false,url: ' https://meet.jit.si' },
                        { title: 'event 2', date: '2021-10-02T13:30:00',allDay: false },
                      

                      ]}
                    
                    eventColor = "#006666"
                    eventClick={handleEventClick}
                    eventConten={renderEventContent}
                /> 
            </div>
        )
    }
    
}

function handleEventClick(eventInfo) {
    <Overlay/>
    alert(`Exam title: '${eventInfo.event.title}' \nStart time:'${eventInfo.event.start}'\nEnd time:'${eventInfo.event.end}'`)
    return (
      <>
        
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  function renderEventContent(eventInfo) {
    <Overlay/>
    return (
      <>
        <b>{eventInfo.event.start}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }