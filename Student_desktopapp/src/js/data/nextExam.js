var examArray = [];

function getExam() {
    axios({
            method: 'get',
            url: 'http://143.244.139.140:5000/api/student/exams/self',
            responseType: 'json',
            headers: {
                'Authorization': "BEARER " + sessionStorage.getItem('token'),
            }

        })
        .then((response) => {
            examArray = response.data
            nextExam(examArray);

        })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.data.error = "TokenExpiredError: jwt expired") {
                    ipc.send('timeOut');
                }

            };

        });

}

function nextExam(array) {
    var now = new Date()
    var nextexam, exam;
    console.log(array)
    if (array.length == 0) {
        sessionStorage.setItem('nextexam', '-1');
        ipc.send('home')
        return
    }
    nextexam = new Date(array[0][1].startTime)

    for (var i = 0; i < array.length; i++) {
        exam = new Date(array[i][1].startTime)
        if (exam - now > 0 && exam < nextexam) {
            nextexam = exam;
        }
    }

    sessionStorage.setItem('nextexam', nextexam / 1000);
    ipc.send('home')
}