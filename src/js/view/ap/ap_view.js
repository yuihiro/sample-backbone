module.exports = ApView = Marionette.ItemView.extend({

    tagName: "div",
    template: require('template/ap_view.hbs'),
    template_grid: require('template/ap_list.hbs'),
    ui: {
        refresh_btn: '#refresh_btn'
    },
    events: {
        'click @ui.refresh_btn': "refresh"
    },

    initialize: function() {
        this.isRender = false;
        this.isData = false;
        this.raw_data = null;
    },

    render: function() {
        this.$el.html(this.template());
        this.initComponent();
        this.loadData();
        this.isRender = true;
    },

    initComponent: function() {
        this.$('.dropdown').dropdown();
        this.$('.checkbox').checkbox();
        this.$('.menu .item').tab();

        this.$('.dropdown').dropdown('setting', 'onChange', function(value, text, $choice) {
            console.log($(this).dropdown('get value'));
        });

        this.$('#search_btn').on('click', function(event) {
            alert("클릭");
        });
        //this.$('.ui.modal').modal('show');
        //
    },

    refresh: function() {
        this.loadData();
    },

    loadData: function() {
        console.log("loadApData");
        var me = this;
        app.app_service.loadApList().then(
            function(response) {
                me.raw_data = response.data;
                me.isData = true;
                me.injectData();
            }
        )
    },

    injectData: function() {
        this.createChart();
        var html = this.template_grid({ items: this.raw_data });
        this.$('#table_container').append(html);
    },

    createChart: function() {
        var sample_data = [
            { "name": "alpha", "skill": "power", "value": 4 },
            { "name": "alpha", "skill": "courage", "value": 8 },
            { "name": "alpha", "skill": "wisdom", "value": 2 },
            { "name": "beta", "skill": "power", "value": 5 },
            { "name": "beta", "skill": "courage", "value": 4 },
            { "name": "beta", "skill": "wisdom", "value": 6 }
        ];
        var visualization = d3plus.viz()
            .container("#chart")
            .data(sample_data)
            .id(["name", "skill"])
            .size("value")
            .type("radar").width(300)
            .height(300)

        .draw();

        var data = [
            { "year": 1991, "name": "alpha", "value": 15 },
            { "year": 1991, "name": "beta", "value": 10 },
            { "year": 1991, "name": "gamma", "value": 5 },
            { "year": 1991, "name": "delta", "value": 50 },
            { "year": 1992, "name": "alpha", "value": 20 },
            { "year": 1992, "name": "beta", "value": 10 },
            { "year": 1992, "name": "gamma", "value": 10 },
            { "year": 1992, "name": "delta", "value": 43 },
            { "year": 1993, "name": "alpha", "value": 30 },
            { "year": 1993, "name": "beta", "value": 40 },
            { "year": 1993, "name": "gamma", "value": 20 },
            { "year": 1993, "name": "delta", "value": 17 },
            { "year": 1994, "name": "alpha", "value": 60 },
            { "year": 1994, "name": "beta", "value": 60 },
            { "year": 1994, "name": "gamma", "value": 25 },
            { "year": 1994, "name": "delta", "value": 32 }
        ]
        d3plus.viz()
            .container("#chart2")
            .data(data)
            .type("bar")
            .id("name")
            .x("year")
            .y("value")
            .width(300)
            .height(300)
            .draw()

    },

    onBeforeDestroy: function() {
        console.log("ap 디스트");
    }
});
