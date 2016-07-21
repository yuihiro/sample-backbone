module.exports = AppService = Marionette.Object.extend({

    loadAppConfig: function () {
        return axios.get("api/sensor/sensor_list");
    },
    login: function (id, pwd) {
        var param = querystring.stringify({id: id, pwd: pwd});
        // var config = { headers: { 'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded' } };
        return axios.post("api/app/login", param);
    },

    logout: function () {
        return axios.get("api/app/logout");
    },
    loadSensorList: function () {
        return axios.get("api/sensor/sensor_list");
    },
    loadSensorInfo: function (id) {
        return axios.get("api/sensor/"+id);
    },
    loadApList: function () {
        return axios.get("api/ap/ap_list");
    },
    loadStatusInfo: function () {
        return axios.get("api/main/status");
    }
    /*
     loadAll: function() {
     return axios.all([
     axios.get('https://api.github.com/users/codeheaven-io');
     axios.get('https://api.github.com/users/codeheaven-io/repos')
     ])
     .then(axios.spread(function (userResponse, reposResponse) {
     //... but this callback will be executed only when both requests are complete.
     console.log('User', userResponse.data);
     console.log('Repositories', reposResponse.data);
     }));
     }
     */
});