module.exports = ModalRegion = Marionette.Region.extend({
    /*
     constructor: function() {
     Marionette.Region.prototype.constructor.apply(this, arguments);
     //this.ensureEl();
     this.$el.on('hidden', {region:this}, function(event) {
     event.data.region.close();
     });
     },

     showModal: function(view){
     console.log("showModal");
     view.on("close", this.hideModal, this);
     this.$el.modal('show');
     },

     hideModal: function(){
     console.log("hideModal");
     this.$el.modal('hide');
     },
     */

    initialize: function (options) {
    },
    attachHtml: function (view) {
        console.log("modal attachHtml");
        this.$el.empty().append(view.el);
        //this.$el.hide().slideDown('fast');
    },
    onShow: function (view, region, options) {
        console.log("onShow");
        var me = this;
        view.$el.addClass('ui small modal');
        view.$el.modal('setting', 'debug', true);
        view.$el.modal('setting', 'closable', false);
        view.$el.modal({
            onHidden: function () {
                me.empty();
            }
        });
        view.$el.modal('show');
        //this.$el.modal('show');
        ///view.show();
        //view.on("close", this.hideModal, this);
        //this.$el.modal('show');
        //view.$el.wrap( "<div class='ui modal'></div>" );
        //console.log(view.$el.html());
        //console.log(view.$('.ui.modal'));
        //this.$el.find('.ui.modal').modal('show');
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
    }
});