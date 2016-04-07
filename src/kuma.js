function kuma (obj, name, arg) {
	let fn = typeof arg === "function";
	let cached = clone(arg, fn);
	let result;

	defineProperty(obj, name, {
		enumerable: true,
		get: function () {
			if (result === undefined) {
				result = fn ? cached.call(obj) : cached;
			}

			return result;
		},
		set: function (value) {
			fn = typeof value === "function";
			cached = clone(value, fn);
			result = undefined;
		}
	});
}
