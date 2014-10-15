/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
            options: {
                strictMath: false,
                strictImports: false,
                strictUnits: false

            },
			files: [{
				expand: true,
				cwd: 'assets/styles/',
				src: ['style.less',
                        'responsive.less'
                    /*'modules.less',
                    'mixins.less',
                    'responsive.less',
                    'style.less',*/

                ],
				dest: '.tmp/public/styles/',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
