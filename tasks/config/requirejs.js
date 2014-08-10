module.exports = function(grunt) {
    grunt.config.set('requirejs', {
        dev: {
            options: {
                appDir: "scripts/",
                baseUrl: "./",
                name: 'main',
                optimize: "uglify2",//'none',//"uglify2",
                mainConfigFile: "scripts/main.js",
                //wrap: true,
                paths: {

                },
                removeCombined: true,
                inlineText: true,
                useStrict: true,
                dir: "./assets/scripts",
                //out: "scripts/output.js"
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};