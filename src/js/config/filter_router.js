var BaseRouter = require("config/base_router.js");

module.exports = FilterRouter = BaseRouter.extend({

    initialize: function () {
        console.log("init router");
    },
    //requresAuth : ['#profile'],
    //preventAccessWhenAuth: ['#login'],
    before: function (params, next) {
        //app.session_model.getAuth(function(data) {
            var path = Backbone.history.location.hash;
            var isHome = _.contains(['#',''], path);
            var isAuth = app.session_model.get('authenticated');
            console.log(isAuth);
            console.log(isHome);
            if(isHome || isAuth) {
                return next();
            } else {
                Backbone.history.navigate('', {trigger:true});
                //app.router.navigate('', true);
            }
            if(isAuth && !isHome) {
                app.layout.viewBar();
            } else {
                app.layout.hideBar();
            }
        //});
    },
    after: function () {
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
        app.layout.viewLogin();
    },

    sensor: function() {
        app.layout.viewSensor();
    },

    ap: function() {
        app.layout.viewAp();
    },

    not: function() {
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