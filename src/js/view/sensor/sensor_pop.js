module.exports = SensorPop = Marionette.ItemView.extend({

    template: require('template/sensor_pop.hbs'),
    events: {
        'click .button': "submit"
    },

    initialize: function(data) {
        console.log(parseInt(data.id));
        console.log("pop init")
        this.isRender = false;
        this.isData = false;
        this.sensor_id = data.id;
    },

    render: function() {
        console.log("pop render")
        this.loadData();
        return this;
    },

    initComponent: function() {
        this.$('.button').on('click', this.submit);
        this.$('.menu .item').tab({
            onFirstLoad: function () {
                console.log("tab");
            },
            onLoad: function () {
                console.log("tab load");
            }
        });
        this.$('.menu .item').tab("setting", "debug", true);
        //this.$('.menu .item').tab("change tab", "second");

        /*
        this.$('.item').click(function(){
            $('.active').removeClass('active');
            $(this).addClass('active');
        });
        */
    },

    injectData: function() {
        //this.$('#name_txt').val(this.raw_data.name);
        //this.$('#ip_txt').val(this.raw_data.ip);
        this.$el.html(this.template(this.raw_data));
        this.initComponent();
        this.isRender = true;
    },

    refresh: function() {
        this.loadData();
    },

    loadData: function() {
        var me = this;
        app.app_service.loadSensorInfo(this.sensor_id).then(
            function(response) {
                me.raw_data = response.data;
                me.isData = true;
                me.injectData();
            }
        )
    },

    show: function() {
    },

    hide: function() {

    },

    submit: function(event) {
        event.preventDefault();
    },

    onBeforeDestroy: function() {
        console.log("pop destroy");
    }
});
