module.exports = MainRegion =  Marionette.Region.extend({

    initialize: function (options) {
    },

    onBeforeShow: function (view, region, options) {
    },

    onShow: function (view, region, options) {
    },

    onBeforeSwapOut: function (view, region, options) {
    },

    onSwap: function (view, region, options) {
    },

    onSwapOut: function (view, region, options) {
    },

    onBeforeEmpty: function (view, region, options) {
    },

    onEmpty: function (view, region, options) {
    },

    attachHtml: function (view) {
        //console.log("main attachHtml");
        this.$el.empty().append(view.el);
        //this.$el.hide().slideDown('fast');
    }

});