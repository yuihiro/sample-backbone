module.exports = MenuView = Marionette.ItemView.extend({
    template: require('template/menu_view.hbs'),
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template());
        this.initComponent();
        return this;
    },
    initComponent: function () {
        var me = this;
        this.$('.ui.menu a.item').eq(0).addClass('active');
        this.$('.ui.menu a.item').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        this.$('.ui.menu .ui.dropdown').dropdown({
            on: 'hover'
        });
        this.$('#logout_btn').on('click', function(event) {
            event.preventDefault();
            me.logout();
        });
    },

    logout: function() {
        app.session_model.clear();
        app.app_service.logout().then(function (result) {
            Backbone.history.navigate('', {trigger: true});
        });
    }
});