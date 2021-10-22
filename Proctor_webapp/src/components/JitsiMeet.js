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
            height:'100%',
            configOverwrite: { 
                prejoinPageEnabled: false,
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                readOnlyName: true,
               /* toolbarButtons: [  'camera', 'chat','closedcaptions', 'desktop',
                      'download', 'embedmeeting','etherpad', 'feedback',  'filmstrip',
                      'fullscreen', 'hangup', 'help', 'invite','livestreaming',
                      'microphone', 'mute-everyone', 'mute-video-everyone',
                      'participants-pane','profile','raisehand',
                      'recording', 'security', 'select-background', 'settings',
                      'shareaudio', 'sharedvideo', 'shortcuts',  'stats',   'tileview',
                      'toggle-camera', 'videoquality', '__end','localrecording'
                   ],
                   localRecording: {
                    // Enables local recording.
                    // Additionally, 'localrecording' (all lowercase) needs to be added to
                    // the `toolbarButtons`-array for the Local Recording button to show up
                    // on the toolbar.
                    //
                     enabled: true,
                    //
                
                    // The recording format, can be one of 'ogg', 'flac' or 'wav'.
                        format: 'wav'
                    //
                
                 },*/
                //toolbarButtons: [],
                //toolbarConfig: {
                    //     // Moved from interfaceConfig.INITIAL_TOOLBAR_TIMEOUT
                    //     // The initial numer of miliseconds for the toolbar buttons to be visible on screen.
                    //     initialTimeout: 0,
                    //     // Moved from interfaceConfig.TOOLBAR_TIMEOUT
                    //     // Number of miliseconds for the toolbar buttons to be visible on screen.
                    //   timeout: 0,
                    //     // Moved from interfaceConfig.TOOLBAR_ALWAYS_VISIBLE
                    //     // Whether toolbar should be always visible or should hide after x miliseconds.
                    //     alwaysVisible: false
                // },

            },
            
            parentNode: document.querySelector('#jitsi-iframe'),
            
            userInfo: {
                displayName: this.state.user.name + "_Invigilator"
            },
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                VIDEO_LAYOUT_FIT: 'both',
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true

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
        localStorage.setItem("most recent exam",this.props.name)
        this.props.history.push('/dashboard');
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
        if(command === 'hangup') {
            return this.props.history.push('/home');
        }

        if(command === 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if(command === 'toggleVideo') {
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
       // const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>
            
            <div id="jitsi-iframe" style={{height:"100%"}}></div>
            {/*<div class="item-center">
                <span>Custom Controls</span>
            </div>
            <div class="item-center">
                <span>&nbsp;&nbsp;</span>
                <i onClick={ () => this.executeCommand('toggleAudio') } className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`} aria-hidden="true" title="Mute / Unmute"></i>
                <i onClick={ () => this.executeCommand('hangup') } className="fas fa-phone-slash fa-2x red-color" aria-hidden="true" title="Leave"></i>
                <i onClick={ () => this.executeCommand('toggleVideo') } className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`} aria-hidden="true" title="Start / Stop camera"></i>
                <i onClick={ () => this.executeCommand('toggleShareScreen') } className="fas fa-film fa-2x grey-color" aria-hidden="true" title="Share your screen"></i>
        </div>*/}

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