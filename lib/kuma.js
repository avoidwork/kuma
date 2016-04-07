"use strict";

/*
2016 Jason Mulligan <jason.mulligan@avoidwork.com>
*/
(function (global) {

	function clone(arg, fn) {
		return fn ? arg : JSON.parse(JSON.stringify(arg));
	}

	function kuma(obj, name, arg) {
		var fn = typeof arg === "function";
		var cached = clone(arg, fn);
		var result = void 0;

		Object.defineProperty(obj, name, {
			enumerable: true,
			get: function get() {
				if (result === undefined) {
					result = fn ? cached.call(obj) : cached;
				}

				return result;
			},
			set: function set(value) {
				fn = typeof value === "function";
				cached = clone(value, fn);
				result = undefined;
			}
		});
	}

	// Setting the semver version
	kuma.version = "1.0.3";

	// CommonJS, AMD, script tag
	if (typeof exports !== "undefined") {
		module.exports = kuma;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return kuma;
		});
	} else {
		global.kuma = kuma;
	}
})(typeof window !== "undefined" ? window : global);
