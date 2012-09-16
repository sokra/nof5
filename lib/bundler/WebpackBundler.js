"use strict";

var EventEmitter = require("events").EventEmitter;

var webpack = require("webpack"),
    _ = require("underscore");

/**
 * @constructor
 */
var WebpackBundler = function () {

    var options = {};

    /**
     * @param {object} newOptions
     */
    this.use = function (newOptions) {
        _.extend(options, newOptions) ;
    };

    /**
     * @param {array.<string>} testScripts
     * @param {function(string)} onBundled
     * @return {string}
     * @private
     */
    this._get = function (testScripts, onBundled) {

        var bundle = null;

        var webpackLoader = require.resolve("./webpackLoader.js");

        var currentOptions = _.extend({}, options, {
            //This key must be created for storing special information needed by nof5
            nof5: {
                //@see /lib/bundler/webpackLoader.js
                testScripts: testScripts
            },

            output: "bundle.js",
            noWrite: true, //disables outputing in a file
            single: true, // disables code splitting
            emitFile: function (filename, content) {
                if(filename === "bundle.js")
                    bundle = content; // store the emitted bundle
            },

            entry: webpackLoader + "!" + webpackLoader // execute the loader
        });

        webpack(currentOptions.entry, currentOptions, function onWebpackFinished(err, stat) {
            if (err) {
                throw err;
            }
            onBundled(bundle)
        });
    };

};

module.exports = WebpackBundler;