document.getElementById('testmic').addEventListener('click', () => {
    ipc.send("settings")
})
document.getElementById('testcam').addEventListener('click', () => {
    ipc.send("settings")
})

document.getElementById('schedule').addEventListener('click', () => {
    ipc.send("schedule")
})