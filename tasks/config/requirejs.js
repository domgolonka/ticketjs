module.exports = function(grunt) {
    grunt.config.set('requirejs', {
        dev: {
            options: {
                appDir: "scripts/",
                baseUrl: "./",
                name: 'main',
                optimize: "none",//'none',//"uglify2",
                mainConfigFile: "scripts/main.js",
                //wrap: true,
                removeCombined: true,
                inlineText: true,
                useStrict: true,
                dir: "./assets/scripts",
                //out: "scripts/output.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};