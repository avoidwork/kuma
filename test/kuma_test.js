var kuma = require("../lib/kuma.js");

exports["string"] = {
	setUp: function (done) {
		this.obj = {};
		this.key = "abc";
		this.value = "xyz";
		this.alt_value = function () { return true; };
		done();
	},
	gets: function (test) {
		test.expect(3);
		test.equal(Object.keys(this.obj).length, 0, "Should be '0'");
		kuma(this.obj, this.key, this.value);
		test.equal(Object.keys(this.obj).length, 1, "Should be '1'");
		test.equal(this.obj[this.key], this.value, "Should be '" + this.value + "'");
		test.done();
	},
	sets: function (test) {
		test.expect(2);
		kuma(this.obj, this.key, this.alt_value);
		test.equal(Object.keys(this.obj).length, 1, "Should be '1'");
		test.equal(this.obj[this.key], this.alt_value(), "Should be '" + this.alt_value() + "'");
		test.done();
	}
};
