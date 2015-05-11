var figlet = require("figlet");

function graffiti (arg) {
	return figlet.textSync(arg, {
		font: 'Graffiti',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	})
}

module.exports = function (grunt) {
	var banner = graffiti("kuma " + grunt.file.readJSON("package.json").version);

	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		babel: {
			options: {
				compact: false,
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
				banner : '/*\n' + banner + '\n\n<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>\n*/\n'
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
		nodeunit : {
			all : ["test/*.js"]
		},
		sed : {
			banner : {
				pattern : "{{BANNER}}",
				replacement : JSON.stringify(banner.split("\n")),
				path : ["<%= concat.dist.dest %>"]
			},
			version : {
				pattern : "{{VERSION}}",
				replacement : "<%= pkg.version %>",
				path : ["<%= concat.dist.dest %>"]
			}
		},
		uglify: {
			options: {
				banner: '/*\n' + banner + '\n\n<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>\n*/\n',
				sourceMap: true,
				sourceMapIncludeSources: true,
				mangle: {
					except: ["keigai", "define", "export", "process", "array", "regex", "store", "string", "utility"]
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

	// aliases
	grunt.registerTask("test", ["nodeunit"]);
	grunt.registerTask("build", ["concat", "sed", "babel"]);
	grunt.registerTask("default", ["build", "test", "uglify"]);
};
