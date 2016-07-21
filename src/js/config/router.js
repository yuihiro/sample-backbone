module.exports = Router = Backbone.Router.extend({

    initialize: function () {
        console.log("init router");
    },

    onRoute: function(name, path, param) {
        console.log("onRouter : "+name);
    },

    routes: {
        "sensor": "sensor",
        "map": "map",
        "ap": "ap",
        "#not": "not",
        "config": "config",
        "#blog": "sensor",
        "#blog/": "sensor",
        "/#blog/": "sensor",
        '*path': 'home'
    },

    home: function() {
        console.log("홈");
        app.layout.viewHome();
        if(this.current().fragment.length > 0) {
            //window.location.href = "";
            Backbone.history.navigate('', {trigger:true});
            //this.router.navigate('', true);
            //Backbone.history.navigate("sensor", {trigger:true});
        }
    },

    sensor: function() {
        console.log("센서");
        app.layout.viewSensor();
        //app.router.navigate("ap");
    },

    ap: function() {
        console.log("AP");
        app.layout.viewAp();
        //app.router.navigate("ap");
    },

    not: function() {
      console.log("없당");
    },

    current: function () {
        var fragment = Backbone.history.fragment,
        routes = _.pairs(this.routes),
        route,
        name,
        found;

        found = _.find(routes, function (namedRoute) {
            route = namedRoute[0];
            name = namedRoute[1];

            if (!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }

            return route.test(fragment);
            }, this);

        if (found) {
            return {
            name: name,
            params: this._extractParameters(route, fragment),
            fragment: fragment
            };
        }
    }    
});