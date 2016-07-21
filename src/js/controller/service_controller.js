var AppService = require('../service/app_service');

module.exports = ServiceController = Marionette.Object.extend({

    initialize: function () {
        console.log("init service");
        this.app_service = new AppService();
    }
});