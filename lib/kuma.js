/*
 __                           ____    _______      _______   
|  | ____ __  _____ _____    /_   |   \   _  \     \   _  \  
|  |/ /  |  \/     \\__  \    |   |   /  /_\  \    /  /_\  \ 
|    <|  |  /  Y Y  \/ __ \_  |   |   \  \_/   \   \  \_/   \
|__|_ \____/|__|_|  (____  /  |___| /\ \_____  / /\ \_____  /
     \/           \/     \/         \/       \/  \/       \/ 

2015 Jason Mulligan <jason.mulligan@avoidwork.com>
*/
"use strict";

(function (global) {
	var defineProperty = Object.defineProperty;

	function clone(arg, fn) {
		return fn ? arg : JSON.parse(JSON.stringify(arg));
	}

	function kuma(obj, name, arg) {
		var fn = typeof arg === "function";
		var cached = clone(arg, fn);
		var result = undefined;

		defineProperty(obj, name, {
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
	kuma.version = "1.0.0";

	// CommonJS, AMD, script tag
	if (typeof exports !== "undefined") {
		module.exports = kuma;
	} else if (typeof define === "function") {
		define(function () {
			return kuma;
		});
	} else {
		global.kuma = kuma;
	}
})(typeof global !== "undefined" ? global : window);