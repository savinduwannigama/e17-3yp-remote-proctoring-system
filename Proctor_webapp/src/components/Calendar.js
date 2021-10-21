import React,{Component} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../css/Schedule.css'
//import Overlay from './Modal.js'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ReactDOM from "react-dom";
import { useState } from "react";
import Modal from "./Modal.js"
const styles = {
  media: {
     height: 0,
     paddingTop: '56.25%' // 16:9
  },
  card: {
     position: 'relative',
  },
  overlay: {
     position: 'absolute',
     top: '20px',
     left: '20px',
     color: 'black',
     backgroundColor: 'white'
  }
}
//const [modal, setModal] = useState(false);
//const Toggle = () => setModal(!modal);
export default class Calendar extends Component {

    constructor(props){
      super(props);
      this.state={
        showModal:false,
        info: {}
      }
    };
    handleClick=(eventInfo)=>{
      let info = this.state.info;
      info['title'] = eventInfo.event.title;
      info['start'] = eventInfo.event.start;
      info['end'] = eventInfo.event.end? eventInfo.event.end:'';
      info['url'] = eventInfo.event.extendedProps.description;
      console.log("description",info['url'])
      this.setState({showModal:!this.state.showModal});
      this.setState({
        info
      });
      console.log(this.state.showModal);
      console.log(this.state.info);
    }
    handleHide=()=>{
      this.setState({showModal:!this.state.showModal});
    }
    render(){
       console.log("events from calendar",this.props.events )
        return (
            <div className="main-box">
               <FullCalendar
                    //timeZone= 'Europe/Greenwich'
                    plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      }}
                    events={
                      /*[
                        { allDay: false,display:'block' ,title: 'CO321 MID', start: '2021-09-28T02:30:00',description: "https://meet.jit.si/"},
                        { title: 'event 2', start: '2021-10-02T13:30:00',end:'2021-10-03T05:30:00',allDay: false , display:'block'},
                      

                      ]*/
                     /*[{"title":"CE594-2021 END SEMESTER EXAMINATION","start":"2021-12-10T03:00:00","allDay":false,"display":"block"},
                      {"title":"EE401-2021 END SEMESTER EXAMINATION","start":"2021-12-16T01:00:00","allDay":false,"display":"block"},
                      {"title":"PR521-2023 MID SEMESTER EXAMINATION","start":"2023-12-10T10:00:00","allDay":false,"display":"block"},
                      {"title":"CE532-2021 END SEMESTER EXAMINATION","start":"2021-12-11T10:00:00","allDay":false,"display":"block"}]
                    
                    */
                      this.props.events
                    
                    }
                    eventTimeFormat= {{ // like '14:30:00'
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short'
                    }}
                    //events = {this.props.events}
                    eventColor = "#006666"
                    eventClick={this.handleClick}
                   
                /> 
                <Modal open={this.state.showModal} close = {this.handleHide} einfo= {this.state.info}>
                  
                </Modal>
            </div>
        )
    }
    
}

function handleEventClick(eventInfo) {
  
    alert(`Exam title: '${eventInfo.event.title}' \nStart time:'${eventInfo.event.start}'\nEnd time:'${eventInfo.event.end}'`)
    return ReactDOM.createPortal(
      <>
      <div className='modal' id = 'modal'>
        
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
      document.getElementById('modal');
      </>
    )
  }

  function renderEventContent(eventInfo) {
    <Card style={styles.card}>
   <CardMedia image={this.props.preview} style={styles.media}/>
   <div style={styles.overlay}>
      this text should overlay the image
    </div>
    </Card>
    return (
      <>
        <b>{eventInfo.event.start}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }