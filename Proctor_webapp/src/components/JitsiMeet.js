import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    constructor(props) {
        super(props);
        this.state = {
            room: 'CO325-EXAM',
            user: {
                name: 'Isuri Devindi'
            },
            isAudioMuted: true,
            isVideoMuted: true
        }
    }

    startMeet = () => {
        const options = {
            //roomName: this.state.room,
            roomName: this.props.name,
            height:'500px',
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            },
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
            },
            
        }

        
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        this.props.history.push('/home');
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command) {
        this.api.executeCommand(command);;
        if(command == 'hangup') {
            return this.props.history.push('/home');
        }

        if(command == 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if(command == 'toggleVideo') {
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>
            <header className="nav-bar">
                <p className="item-left heading">Jitsi React</p>
            </header>
            <div id="jitsi-iframe"></div>
            <div class="item-center">
                <span>Custom Controls</span>
            </div>
            <div class="item-center">
                <span>&nbsp;&nbsp;</span>
                <i onClick={ () => this.executeCommand('toggleAudio') } className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`} aria-hidden="true" title="Mute / Unmute"></i>
                <i onClick={ () => this.executeCommand('hangup') } className="fas fa-phone-slash fa-2x red-color" aria-hidden="true" title="Leave"></i>
                <i onClick={ () => this.executeCommand('toggleVideo') } className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`} aria-hidden="true" title="Start / Stop camera"></i>
                <i onClick={ () => this.executeCommand('toggleShareScreen') } className="fas fa-film fa-2x grey-color" aria-hidden="true" title="Share your screen"></i>
            </div>

            </>
        );
    }
}

export default withRouter(JitsiComponent);

/*import React, { useState, useEffect } from 'react';
import ProgressComponent from '@mui/material/CircularProgress';

function JitsiMeetComponent() {
  const [loading, setLoading] = useState(false);
  const containerStyle = {
    width: '800px',
    height: '400px',
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  }

 function startConference() {
  try {
   const domain = 'meet.jit.si';
   const options = {
    roomName: 'roomName',
    height: 400,
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
    },
   };

   const api = new JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    setLoading(false);
    api.executeCommand('displayName', 'MyName');
   });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }

 
 useEffect(() => {
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if (window.JitsiMeetExternalAPI) {
    startConference();
    } else {
    alert('JitsiMeetExternalAPI not loaded');
   }
 }, []);

 return (
  <div
   style={containerStyle}
  >
   {loading && <ProgressComponent />}
   <div
    id="jitsi-container"
    style={jitsiContainerStyle}
   />
  </div>
 );
}

export default JitsiMeetComponent;*/