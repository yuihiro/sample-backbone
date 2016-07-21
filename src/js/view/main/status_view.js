module.exports = StatusView = Marionette.ItemView.extend({

    template: require('template/status_view.hbs'),

    initialize: function () {
        this.isRender = false;
        this.isData = false;

        this.interval = null;
    },

    render: function () {
        this.$el.html(this.template());
        this.initComponent();
        this.isRender = true;
        //this.toggleUpdate();
        //this.loadData();
        return this;
    },

    initComponent: function() {
        this.$('.checkbox').checkbox('setting', 'onChange', this.toggleUpdate.bind(this));
    },

    toggleUpdate: function() {
        if (this.interval == null) {
            this.interval = setInterval(this.loadData.bind(this), 5000);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    loadData: function() {
        var me = this;
        app.app_service.loadStatusInfo().then(function (response) {
                var result = response.data;
                me.injectData(result);
            });
    },

    injectData: function (data) {
        console.log("data");
        var ap_total = data.sensor_status.total_cnt;
        var sensor_total = data.ap_status.total_cnt
        this.$('#sensor_txt').text("AP : "+ap_total);
        this.$('#ap_txt').text("센서 : "+sensor_total);
    },
});