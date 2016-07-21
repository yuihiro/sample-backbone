module.export = StatusModel = Marionette.Object.extend({

        default: {
            id: null,
            name: null
        },

        initialize: function () {
            this.id = "woobin";
            this.name = "우빈";
        }
    }
);