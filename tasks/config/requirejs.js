module.exports = function(grunt) {
    grunt.config.set('requirejs', {
        dev: {
            options: {
                appDir: "scripts/",
                baseUrl: "./",
                name: 'main',
                uglify2: {
                  mangle: false
                },
               optimize: 'none', //uglify2
                mainConfigFile: "scripts/main.js",
                //wrap: true,
                removeCombined: false, // make it true
                inlineText: true,
                useStrict: true, // already set?
                dir: "./.tmp/public/scripts" // change to ./assets/scripts  for production??
                //out: "scripts/output.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};
