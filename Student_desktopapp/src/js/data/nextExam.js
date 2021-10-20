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
    var nextexam, exam, examIndex;
    if (array.length == 0) {
        sessionStorage.setItem('nextExamAt', '-1');
        sessionStorage.sertItem('nextExam', 'no exam')
        ipc.send('home')
        return
    }
    nextexam = new Date(array[0][1].startTime)
    examIndex = 0
    var now = new Date()
    for (var i = 0; i < array.length; i++) {
        exam = new Date(array[i][1].startTime)
        if ((exam > now) && (exam < nextexam)) {
            nextexam = exam;
            examIndex = i;
        }
    }

    sessionStorage.setItem('nextExamAt', nextexam / 1000);
    sessionStorage.setItem('nextExam', array[examIndex][0].exam);
    ipc.send('home')
}