# SECURITY FEATURES IN JITSI-MEET

Source: (https://jitsi.org/security/)
1.	Hop by hop encryption: each stage of the video call is encrypted in part.
Procedure: Encrypted call to the server is decrypted at the server and re-encrypted and forwarded to the video participants.
However, server owner can access data!
Solution: Host our own Jitsi-Meet server 🤔
2.	Can turn on end-to-end encryption (e2ee) on a browser with support for insertable streams. Currently this means any browser based on Chromium 83 and above, including Microsoft Edge, Google Chrome, Brave and Opera. Is also in the Electron client.
3.	Should avoid using the built-in "Start recording" feature, as a meeting recording could be uploaded to the cloud. If the meeting does need to be recorded, use recording software on the computer.
4.	All meeting rooms are ephemeral: they only exist while the meeting is actually taking place. They get created when the first participant joins and they are destroyed when the last one leaves. If someone joins the same room again, a brand-new meeting is created with the same name and there is no connection to any previous meeting that might have been held with the same name  Avoid potential attackers from distinguishing reserved from unreserved meetings which then makes the reserved meetings easier to identify and target.
5.	Name of a meeting is sensitive and needs to be protected. Avoid using common names such as test etc.  Use the jitsi random meeting name generator.
6.	Can set a meeting password.

# SECURITY FEATURES THAT SHOULD BE IN OUR APP
1.	Secure hosting on AWS
2.	Authentication when logging in
3.	Defined access right-->
4.	Protect meeting name and ID-->securely store in the DB
5.	Encryption of recordings
6.	Protocols that can be used-->  (https://corp.kaltura.com/blogvideo-streaming-protocols/)
