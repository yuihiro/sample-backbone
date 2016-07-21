module.exports = SensorList = Marionette.ItemView.extend({

    template : require('template/sensor_list.hbs'),
    ui: {
        btn : 'a'
    },
    events: {
        "click @ui.btn": "clickView"
    },

    initialize: function (data) {
        //this.data = {};
        //this.data.items = data; 
    },

    render: function (data) {
        console.log("차일드 rendor")
        var html = this.template({items:data});
        this.$el.html(html);
        return this;
    },

    clickView: function (event) {
        event.preventDefault();
        console.log($(event.target).attr("href"));
    },

    onBeforeDestroy: function() {
        console.log("리스트 디스트");
    }    
});