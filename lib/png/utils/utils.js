// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var fs = require('fs');

/**
 * @class utils
 * @module PNG
 * @submodule PNGCore
 */
module.exports = {

	/**
	 * Loads (installs) a specific module
	 *
	 * @method loadModule
	 * @param {module} module Module
	 * @param {object} obj Object the module should apply to
	 */
	loadModule: function (module, obj) {
		this.copyModule(module, obj);
	},

	/**
	 * Copies the methods of a module to an object
	 *
	 * @method copyModule
	 * @param {object} methods Dictionary of module methods
	 * @param {object} obj Object the module methods should apply to
	 */
	copyModule: function (methods, obj) {
		for(var methodName in methods) {
			if (methods.hasOwnProperty(methodName)) {
				obj[methodName] = methods[methodName];
			}
		}
	}
};
