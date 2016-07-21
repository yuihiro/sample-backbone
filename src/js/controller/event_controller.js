module.exports = EventController = Marionette.Object.extend({

    initialize: function() {
        console.log("init event");

        app.vent = new Backbone.Wreqr.EventAggregator();
        app.reqres = new Backbone.Wreqr.RequestResponse();
        app.commands = new Backbone.Wreqr.Commands();

        app.vent.on("app:load_success", function (data) {
            app.app_info = data;
            console.log("app_info");
            console.log(app.app_info);
            app.layout.showLogin();
            //Backbone.history.navigate("login");
        });

        app.vent.on("login:login_success", function (data) {
            app.login_info = data;
            console.log("login_info");
            console.log(app.login_info);
            app.layout.showMain();
            app.layout.showView("admin/list");
            //Backbone.history.navigate("admin/list");
        });

        app.vent.on("view:view_change", function (data) {
            console.log(data);
            app.layout.showView(data);
        });
    }
});