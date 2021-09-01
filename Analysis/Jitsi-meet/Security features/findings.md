# SECURITY FEATURES IN JITSI-MEET

Source: (https://jitsi.org/security/)
1.	Hop by hop encryption: each stage of the video call is encrypted in part.
Procedure: Encrypted call to the server is decrypted at the server and re-encrypted and forwarded to the video participants.
(https://en.wikipedia.org/wiki/Jitsi#Jitsi_Meet)
Group calls use DTLS-SRTP encryption, but rely on the Jitsi Videobridge (JVB) as video router, where packets are decrypted temporarily.

(https://en.wikipedia.org/wiki/Secure_Real-time_Transport_Protocol#Data_flow_encryption)

### DTLS-SRTP
provide encryption, message authentication and integrity, and replay attack protection to the RTP data in both unicast and multicast applications


However, server owner can access data!
The Jitsi team emphasizes that "they are never stored to any persistent storage and only live in memory while being routed to other participants in the meeting", and that this measure is necessary due to current limitations of the underlying WebRTC technology.
Solution: Host our own Jitsi-Meet server 🤔
2.	Can turn on end-to-end encryption (e2ee) on a browser with support for insertable streams. Currently this means any browser based on Chromium 83 and above, including Microsoft Edge, Google Chrome, Brave and Opera. Is also in the Electron client.
Encrypted communication (secure communication): As of April 2020, 1–1 calls use the P2P mode, which is end-to-end encrypted via DTLS-SRTP between the two participants.
3.	Should avoid using the built-in "Start recording" feature, as a meeting recording could be uploaded to the cloud. If the meeting does need to be recorded, use recording software on the computer.
4.	All meeting rooms are ephemeral: they only exist while the meeting is actually taking place. They get created when the first participant joins and they are destroyed when the last one leaves. If someone joins the same room again, a brand-new meeting is created with the same name and there is no connection to any previous meeting that might have been held with the same name  Avoid potential attackers from distinguishing reserved from unreserved meetings which then makes the reserved meetings easier to identify and target.
5.	Name of a meeting is sensitive and needs to be protected. Avoid using common names such as test etc.  Use the jitsi random meeting name generator.
6.	Can set a meeting password.

Protocols used-> SIP, XMPP, RTP (DTLS-SRTP)

# SECURITY FEATURES THAT SHOULD BE IN OUR APP
1.	Secure hosting on AWS
2.	Authentication when logging in
3.	Defined access right-->
4.	Protect meeting name and ID-->securely store in the DB
5.	Encryption of recordings
6.	Protocols that can be used-->  (https://corp.kaltura.com/blogvideo-streaming-protocols/)
