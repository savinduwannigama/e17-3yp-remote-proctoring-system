document.getElementById('testcam').addEventListener('click', () => {
    ipc.send("settings")
})

document.getElementById('examschedule').addEventListener('click', () => {
    ipc.send("schedule")

})

document.getElementById('howtojoin').addEventListener('click', () => {
    ipc.send('help')
})

document.getElementById('next-exam').innerHTML = sessionStorage.getItem('nextExam');