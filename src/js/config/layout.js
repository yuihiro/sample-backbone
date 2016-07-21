var MainRegion = require("config/region/main_region.js");
var ModalRegion = require("config/region/modal_region.js");

var MenuView = require("view/main/menu_view.js");
var StatusView = require("view/main/status_view.js");
var LoginView = require("view/main/login_view.js");

var ApView = require("view/ap/ap_view.js");
var SensorView = require("view/sensor/sensor_view.js");
//var LoginPop = require("view/login_pop.js");

module.exports = Layout = Marionette.LayoutView.extend({

    el: '#app_container',
    template: false,
    regions: {
        menu_region: '#menu_container',
        status_region: '#status_container',
        //content_region: '#content_container',
        //modal_region: '#modal_container'
        content_region: {
            selector: '#content_container',
            regionClass: MainRegion
        },
        modal_region: {
            selector: '#modal_container',
            regionClass: ModalRegion
        }
    },
    
    initialize: function() {
        console.log("init layout");
        this.isLogined = false;
        this.current_view = null;
        this.popup_lst = [];
    },

    onShow: function() {
        console.log("show layout");
    },

    toggleBar: function() {
        var path = Backbone.history.location.hash;
        var isHome = _.contains(['#',''], path);
        if(app.session_model.get('authenticated') && !isHome) {
            this.viewBar();
        } else {
            this.hideBar();
        }
    },

    viewBar: function() {
        console.log("view bar");
        this.showChildView("status_region", new StatusView());
        this.showChildView("menu_region", new MenuView());
    },

    hideBar: function() {
        console.log("hide bar");
        this.getRegion("status_region").empty();
        this.getRegion("menu_region").empty();
    },

    viewLogin: function() {
        console.log("view login");
        this.getRegion("content_region").show(new LoginView());
        this.toggleBar();
    },

    viewSensor: function() {
        console.log("view sensor")
        this.getRegion("content_region").show(new SensorView());
        this.toggleBar();
    },

    viewAp: function() {
        console.log("view ap")
        this.getRegion("content_region").show(new ApView());
        this.toggleBar();
    },

    viewPop: function($view) {
        console.log("view pop")
        this.getRegion("modal_region").show($view);
    },

    showView: function (name) {
        console.log("showView : " + name);

        if (name != this.current_view) {
            var view;
            if (name == "admin/list") {
                //view = new AdminListView();
            } else if (name == "config") {
                //view = new ConfigView();
            }
            this.main_region.show(view);
            this.current_view = name;
        }
    }

    // myRegion.reset();
    // MyApp.mainRegion.show(anotherView2, { preventDestroy: true });
    // MyApp.mainRegion.show(anotherView2, { forceShow: true });
    // myRegion.show(myView, {triggerAttach: true});
    // myRegion.show(myView, {triggerBeforeAttach: true});

});