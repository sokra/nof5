"use strict";

var _ = require("underscore");

function webpackLoader() {
    var testScripts = this.options.nof5.testScripts,
        src = [];

    _(testScripts).each(function eachTestScript(testScript) {
        src.push('require(' + JSON.stringify(testScript) + ');');
    });

    return src.join('\n');
}

module.exports = webpackLoader;