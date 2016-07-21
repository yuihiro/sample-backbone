module.exports = LoginPop = Marionette.ItemView.extend({

    template: require('template/login_pop.hbs'),
    events: {
        'click .button': "submit"
    },

    initialize: function() {
        this.isRender = false;
        this.isData = false;
    },

    render: function() {
        console.log("팝업 렌더")
        this.$el.html(this.template());
        if (!this.isRender) this.initComponent();
        this.isRender = true;
        this.loadData();
        return this;
    },

    initComponent: function() {
        this.$('.button').on('click', this.submit);
        this.$('.ui.modal').modal('setting', 'closable', false);
    },

    refresh: function() {
        this.loadData();
    },

    loadData: function() {
    },

    injectData: function () {
    },

    show: function() {
        console.log("오픔");
        this.$('.ui.modal').modal('show');
    },

    submit: function(event) {
        console.log("서브");
        event.preventDefault();
        console.log(this.$('.form').serialize());
    }
});
