var FilterRouter = require("config/filter_router");
var Layout = require("config/layout");
var EventController = require("controller/event_controller");
var ServiceController = require("controller/service_controller");
var AppService = require('service/app_service');

var SessionModel = require("model/session_model");

var axiosDefaults = require("axios/lib/defaults");

module.exports = App = Marionette.Application.extend({

    el: '#app_container',

    initialize: function () {
        console.log("init app");
        global.app = this;
        this.server_url = "http://localhost:9090/";
        this.initAjax();

        this.develop_mode = true;
        this.app_info = {};
        this.login_info = {};

        this.session_model = new SessionModel();
        this.layout = new Layout();
        this.router = new FilterRouter();
        this.event = new EventController();
        this.app_service = new AppService();

        this.rootView = this.layout;
    },

    initAjax: function () {
        //axiosDefaults.xsrfCookieName = "csrftoken"
        //axiosDefaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.baseURL = this.server_url;
        //axios.defaults.withCredentials = true;
        //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

        //axios.defaults.headers.post['x-requested-with'] = 'XMLHttpRequest';
        //axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                //console.log(error.data);
                console.log(error.status);
                //console.log(error.headers);6
                //console.log(error.config);
            }
            return Promise.reject(error);
        });
    },

    onStart: function () {
        console.log("start app");
        if (!Backbone.History.started) Backbone.history.start();
        //if (!Backbone.History.started) Backbone.history.start({pushState:true, root:'/path');
    },

    loadAppConfig: function () {
        var promise = this.app_service.loadAppConfig();
        promise.then(function (response) {
            console.log(response);
            //app.event.vent.trigger("app:load_success", data);
        });
    }
});
