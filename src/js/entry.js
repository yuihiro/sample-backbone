global.$ = global.jQuery = require("jquery");
global._ = require("underscore");
global.Backbone = require("backbone");
global.Backbone.$ = global.$;
global.Backbone.Radio = require("backbone.radio");
global.Backbone.Wreqr = require("backbone.wreqr");
global.Marionette = require("backbone.marionette");
//global.Backbone.Blazer = require("backbone.blazer");
//
global.axios = require("axios");
global.Handlebars = require("handlebars");
global.Cookies = require("js-cookie");
global.querystring = require('querystring');

var hbsfy = require("hbsfy/runtime");
require("pace");
require("swag");
require("./app");
//var gsap = require('gsap');
//global.TweenMax = gsap.TweenMax;
//
$(function () {
    console.log("ready!!");

    paceOptions = {
        restartOnRequestAfter: true,
        ajax: true,
        document: false,
        eventLag: false,
        elements: false
    };

    /*
     Marionette.Application.prototype._initChannel = function () {
     this.channelName = _.result(this, 'channelName') || 'global';
     this.channel = _.result(this, 'channel') || Backbone.Radio.channel(this.channelName);
     }
     */

    Swag.registerHelpers(hbsfy);
    Swag.Config.partialsPath = './src/template/partial/';

    new App().start();
});