// Setting the semver version
kuma.version = "{{VERSION}}";

// CommonJS, AMD, script tag
if ( typeof exports !== "undefined" ) {
	module.exports = kuma;
}
else if ( typeof define === "function" ) {
	define( function () {
		return kuma;
	} );
}
else {
	global.kuma = kuma;
}
} )( typeof global !== "undefined" ? global : window );
