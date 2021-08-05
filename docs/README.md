---
layout: home
permalink: ./index.html

# Please update this with your repository name and title
repository-name: e17-3yp-remote-proctoring-system
title: Remote Proctoring System
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"
[comment]: # ( [Testing](#testing))
[comment]: # ( [Detailed budget](#detailed-budget))
[comment]: # ([Conclusion](#conclusion))
# REMOTE PROCTORING SYSTEM

---

## TEAM
-  E/17/058, DEVINDI G.A.I, [e17058@eng.pdn.ac.lk](mailto:name@email.com)
-  E/17/190, LIYANAGE S.N, [e17190@eng.pdn.ac.lk](mailto:name@email.com)
-  E/17/369, WANNIGAMA S.B, [e17369@eng.pdn.ac.lk](mailto:name@email.com)

[//]: # (## [Image of the final hardware]) 

## CONTENT
1. [PROBLEM STATEMENT](#problem-statement)
2. [SOLUTION](#solution )
3. [SYSTEM OVERVIEW](#system-overview)
4. [LINKS](#links)



---

## PROBLEM STATEMENT

When conducting examinations where the skills of the students in a limited timeframe, it's crucial to manage the external factors affecting the performance of the students at a satisfactory level. 
However it could be challenging to manage these factors in an online environment.

## SOLUTION
##### ***REMOTE PROCTORING DEVICE***
We have come up with a single device which integrates the hardware and software components needed to conduct an examination in the currently implemented system, which will provide a seamless process for the proctors and students involved in an examination.

![Prototype](./assets/img/prototype.gif)


[//]: # (## Solution Architecture High level diagram + description)

## BASIC FEATURES

#### ***PROCTOR'S UI***

|Get video/audio feed from multiple students |  Detect power failures from student’s side | Notify students about examinations|
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img src="./assets/img/features/videoconference.png" width="200"/> | <img src="./assets/img/features/disconnetion.jpg" width="225" /> |<img src="./assets/img/features/notification.png" width="200" />|



|One-on-one interaction with students |   Unauthorized activity detection|
|:-------------------------:|:-------------------------:|
|<img src="./assets/img/features/video-chat.png" width="200" />| <img src="./assets/img/features/unauthorized.png" width="200" />|

#### ***REMOTE DEVICE***

|Capture the video stream of the candidate’s environment |  Mountable on a table | Can directly talk only with the proctor|
|:-------------------------:|:-------------------------:|:-------------------------:
|<img src="./assets/img/features/streaming.png" width="200"/> | <img src="./assets/img/features/tripod.png" width="225" /> |<img src="./assets/img/features/call-forwarding.png" width="200" />



|See the remaining time of the exam |Locally record the video stream locally incase of connection issues and upload later | Separate power supply unit to supply power incase of a power failure|
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img src="./assets/img/features/chronometer.png" width="200" />| <img src="./assets/img/features/cloud-database.png" width="200" />| <img src="./assets/img/features/power-bank.png" width="200" />|

## SYSTEM OVERVIEW

![system](./assets/img/system/oursystem.PNG)

The device on the student's side is capable of capturing the video and audio stream from students continuously even incase of a power failure.
The proctor will be able to monitor the video and audio streams captured from all the students facing an examination through the browser application in the proctor's side.


##### ***HIGH-LEVEL SYSTEM OVERVIEW***
![overview](./assets/img/system/system.PNG)

The system consists of three main endpoints.

* Web browser in Proctor's end
* Desktop application in Student's end
* Database and server application hosted on the Cloud
* Method used to ensure secure video/audio streaming:

HTTPS protects the user from so-called “man-in-the-middle” attacks where hackers can use vulnerabilities in these public networks to steal data as it’s being transmitted to the viewer. using HLS encryption to mask a users’ connection with the website and prevents this sort of attack.

#### ***TECHNOLOGY STACK***
![technology](./assets/img/system/technology.PNG)

## LINKS

- [Project Repository](https://github.com/cepdnaclk/e17-3yp-remote-proctoring-system){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/e17-3yp-remote-proctoring-system){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/){:target="_blank"}
- [University of Peradeniya](https://eng.pdn.ac.lk/){:target="_blank"}


[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
