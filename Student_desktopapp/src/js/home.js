document.getElementById('testmic').addEventListener('click', () => {
    ipc.send("settings")
})
document.getElementById('testcam').addEventListener('click', () => {
    ipc.send("settings")
})

document.getElementById('examschedule').addEventListener('click', () => {
    ipc.send("schedule")

})