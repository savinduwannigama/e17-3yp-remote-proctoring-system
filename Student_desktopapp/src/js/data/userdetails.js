const axios = require('axios');

axios({
        method: 'get',
        url: 'http://143.244.139.140:5000/api/student/students/self',
        responseType: 'json',
        headers: {
            'Authorization': "BEARER " + sessionStorage.getItem('token'),
        }

    })
    .then((response) => {
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('regNo', response.data.regNo);
        sessionStorage.setItem('department', response.data.department);
        sessionStorage.setItem('device', response.data.device);
        console.log(response.data);
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response);

        };
    });