module.exports = SessionModel = Backbone.Model.extend({
    url: 'http://localhost:9090/api/app/session/session',
    defaults: {
        "authenticated":  false,
        "id":     null
    },
    initialize: function () {
        console.log("session init");
        /*
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': 'csrf'
            }
        });
        */
        if (Storage && sessionStorage) {
            this.supportStorage = true;
        }
    },
    get: function (key) {
        if (this.supportStorage) {
            var data = sessionStorage.getItem(key);
            if (data && data[0] === '{') {
                return JSON.parse(data);
            } else {
                return data;
            }
        } else {
            return Backbone.Model.prototype.get.call(this, key);
        }
    },
    set: function (key, value) {
        if (this.supportStorage) {
            sessionStorage.setItem(key, value);
        } else {
            Backbone.Model.prototype.set.call(this, key, value);
        }
        return this;
    },
    unset: function (key) {
        if (this.supportStorage) {
            sessionStorage.removeItem(key);
        } else {
            Backbone.Model.prototype.unset.call(this, key);
        }
        return this;
    },
    clear: function () {
        if (this.supportStorage) {
            sessionStorage.clear();
        } else {
            Backbone.Model.prototype.clear(this);
        }
    },
    getAuth: function (callback) {
        this.url = '';
        var that = this;
        var Session = this.fetch();
        Session.done(function (response) {
            that.set('authenticated', response.auth);
            that.set('id', response.id);
        });
        Session.fail(function (response) {
            response = JSON.parse(response.responseText);
            that.clear();
            //csrf = response.csrf !== csrf ? response.csrf : csrf;
            //that.initialize();
        });
        Session.always(callback);
    }
});