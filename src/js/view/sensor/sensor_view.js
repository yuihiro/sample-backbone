var SensorList = require("view/sensor/sensor_list.js");
var SensorPop = require("view/sensor/sensor_pop.js");

module.exports = SensorView = Marionette.ItemView.extend({

    template: require('template/sensor_view.hbs'),
    ui: {
        refresh_btn: '#refresh_btn'
    },
    events: {
        'click @ui.refresh_btn': "refresh"
    },

    initialize: function() {
        this.isRender = false;
        this.isData = false;

        var me = this;
        $(window).on('resize', function(e) {
            console.log("resize");
            var height = $(window).height()-120-50-70;
            console.log(height);
            //me.$("#table_container").setGridHeight(height);
        });
    },

    render: function() {
        this.$el.html(this.template());
        this.initComponent();
        this.loadData();
        this.isRender = true;
    },

    initComponent: function() {
    },

    refresh: function() {
        this.loadData();
    },

    loadData: function() {
        var me = this;
        app.app_service.loadSensorList().then(
            function(response) {
                me.raw_data = response.data;
                me.isData = true;
                me.injectData();
            }
        )
    },

    injectData: function () {
        var height = $(window).height()-120-50-70;

        $("#table_container").jsGrid({
            height: height,
            width: "100%",
            filtering: false,
            editing: false,
            sorting: true,
            paging: false,
            selecting: true,
            data: this.raw_data,
            fields: [
                { title: "ID", name:"id", type: "text"},
                { title: "이름", name:"name", type: "text"},
                { title: "IP", name:"ip", type: "text"},
                { title: "MAC", name:"mac_str", type: "text"},
                { title: "상태", name:"status_str", type: "text"}
            ],
            rowClick: function(e) {
                console.log(e.item);
                app.layout.viewPop(new SensorPop(e.item));
            },
        });
    },

    popupAdminAdd: function() {
        //app.layout.createPopup("AdminAddView", {title:name});
    },


    deleteAdmin: function() {
        //app.service.admin_service.deleteAdminInfo();
    },

    onBeforeDestroy: function() {
    }
});
