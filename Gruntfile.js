module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		babel: {
			options: {
				compact: false,
				presets: ["babel-preset-es2015"],
				sourceMap: false
			},
			dist: {
				files: {
					"lib/<%= pkg.name %>.js": "lib/<%= pkg.name %>.es6.js"
				}
			}
		},
		concat : {
			options : {
				banner : '/*\n<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n*/\n'
			},
			dist : {
				src : [
					"src/intro.js",
					"src/clone.js",
					"src/kuma.js",
					"src/outro.js"
				],
				dest : "lib/<%= pkg.name %>.es6.js"
			}
		},
		eslint: {
			target: ["lib/<%= pkg.name %>.es6.js"]
		},
		nodeunit : {
			all : ["test/*.js"]
		},
		nsp: {
			package: grunt.file.readJSON("package.json")
		},
		sed : {
			version : {
				pattern : "{{VERSION}}",
				replacement : "<%= pkg.version %>",
				path : ["<%= concat.dist.dest %>"]
			}
		},
		uglify: {
			options: {
				banner: '/*\n<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n*/\n',
				sourceMap: true,
				sourceMapIncludeSources: true,
				mangle: {
					except: ["kuma", "define", "export", "process"]
				}
			},
			target: {
				files: {
					"lib/<%= pkg.name %>.min.js" : ["lib/<%= pkg.name %>.js"]
				}
			}
		},
		watch : {
			js : {
				files : "<%= concat.dist.src %>",
				tasks : "default"
			},
			pkg: {
				files : "package.json",
				tasks : "default"
			}
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-sed");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-nsp");
	grunt.loadNpmTasks("grunt-eslint");

	// aliases
	grunt.registerTask("test", ["eslint", "nodeunit", "nsp"]);
	grunt.registerTask("build", ["concat", "sed", "babel"]);
	grunt.registerTask("default", ["build", "test", "uglify"]);
};
