module.exports = LoginView = Marionette.ItemView.extend({
    template: require('template/login_view.hbs'),
    ui: {
        submit_btn: ":submit",
        id_txt: "#id_txt",
        pwd_txt: "#pwd_txt"
    },
    events: {
        'click @ui.submit_btn': "submit"
    },
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template());
        this.$('.checkbox').checkbox();
        if (Cookies.get('id') != undefined) {
            this.$('#id_txt').val(Cookies.get('id'));
            this.$('.ui.checkbox').checkbox('set checked');
        }
        return this;
    },
    submit: function (event) {
        event.preventDefault();
        var id = this.$('#id_txt').val();
        var pwd = this.$('#pwd_txt').val();
        if (id.length == 0 || pwd.length == 0) {
            alert("값을 입력해주세요");
            return;
        }
        this.login(id, pwd);
    },
    login: function (id, pwd) {
        console.log("login");
        var me = this;
        app.app_service.login(id, pwd).then(function (result) {
                console.log(result.data);
                var login_type = result.data.login_type;
                if (login_type == "fail_id") {
                    alert("ID가 틀렸습니다");
                } else {
                    var isSave = me.$('.ui.checkbox').checkbox('is checked');
                    if (isSave) {
                        Cookies.set('id', id);
                    } else {
                        Cookies.remove('id');
                    }


                    app.session_model.set('authenticated', true);
                    app.session_model.set('id', result.data.user_id);
                    app.session_model.set('session_id', result.data.session_id);

                    Backbone.history.navigate('sensor', {trigger: true});
                    //app.event.vent.trigger("login:login_success", data);
                }
            }
        )
    },
    onBeforeRender: function () {
    },
    onRender: function () {
    }
    ,
    onBeforeAttach: function () {
    }
    ,
    onAttach: function () {
    }
    ,
    onShow: function () {
    }
    ,
    onDomRefresh: function () {
    }
    ,
    onBeforeDestroy: function () {
    }
    ,
    onDestroy: function () {
    }
})
;