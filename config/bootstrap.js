/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 *
 * It's very important to trigger this callback method when you are finished with the bootstrap!
 * (otherwise your server will never lift, since it's waiting on the bootstrap)
 */
module.exports.bootstrap = function(cb) {
    var passport = require("passport");
    var LocalStrategy = require("passport-local").Strategy;
    var RememberMeStrategy = require("passport-remember-me").Strategy;
    var initialize = passport.initialize();
    var session = passport.session();
    var http = require("http");
    var methods = ["register", "login", "logIn", "logout", "logOut", "isAuthenticated", "isUnauthenticated"];
    var async = require("async");



    /**
     * Expose the local URL of our app
     */

        // Check if app runs on SSL
    sails.config.usingSSL = (
        (sails.config.serverOptions && sails.config.serverOptions.key && sails.config.serverOptions.cert
) || (
        sails.config.express &&
        sails.config.express.serverOptions &&
        sails.config.express.serverOptions.key &&
        sails.config.express.serverOptions.cert
        )
        );

    // Compose the local app url
    sails.config.localAppURL = ( sails.config.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';

    /* THIS NEEDS TO BE CHANGED SINCE IT REQUIRES REDIS */
    /*
    async.series([

        /**
         * Setup the emailTemplate (Mailer.template) service
         */
    /*
            function (cb) {
            require("email-templates")( sails.config.paths.views + '/email', function (err, template) {
                if (err) sails.log.warn( err );

                Mailer.template = template;
                cb();
            });
        },

        /**
         * Setup Kue
         */
/*
            function (cb) {
            var kue   = require('kue'),
                redis = require('../node_modules/kue/node_modules/redis');

            // Override default createClient function to allow
            // config options for redis client
            kue.redis.createClient = function() {
                var options = sails.config.redis;

                // Extract options from Redis URL
                if (sails.config.redis.url) {
                    var redisUri = url.parse( sails.config.redis.url );
                    options = {
                        host: redisUri.hostname,
                        port: redisUri.port,
                        pass: redisUri.auth.split(':')[1]
                    };
                }

                var client = redis.createClient( options.port, options.host, options );

                // Log client errors
                client.on("error", function (err) {
                    sails.log.error(err);
                });

                // Authenticate, if required
                if (options.pass) {
                    client.auth( options.pass, function (err) {
                        if (err) sails.log.error(err);
                    });
                }

                return client;
            }

            // Create job queue on Jobs service
            var processors = Jobs._processors;
            Jobs = kue.createQueue();
            Jobs._processors = processors;

            cb();
        }

    ], function() {

        ////////////////////////////////
        // All bootstrapping is finished
        ////////////////////////////////

        // If this is a worker instance, execute startWorker
        // callback to skip starting the server
        if (sails.config.worker) {
            return startWorker();
        }

        // If this is a normal Sails instance,
        // execute the callback to start the server
        cb();
    }); */

    /**
     * Following is to fix socket request on authenticated users.
     *
     * Thanks to: http://stackoverflow.com/questions/17365444/sails-js-passport-js-authentication-through-websockets/18343226#18343226
     */

    /*sails.removeAllListeners('router:request');

    sails.on('router:request', function(req, res) {
        initialize(req, res, function() {
            session(req, res, function(err) {
                if (err) {
                   // return sails.config[500](500, req, res);
                    return serverError();
                }

                for (var i = 0; i < methods.length; i++) {
                    req[methods[i]] = http.IncomingMessage.prototype[methods[i]].bind(req);
                }

                sails.router.route(req, res);
            });
        });
    }); */

    /**
     * Passport session setup.
     *
     * To support persistent login sessions, Passport needs to be able to
     * serialize users into and deserialize users out of the session. Typically,
     * this will be as simple as storing the user ID when serializing, and finding
     * the user by ID when deserializing.
     *
     * @param   {sails.model.user}  user
     * @param   {Function}          done
     */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    /**
     * User deserialize method.
     *
     * @param   {Number}    id
     * @param   {Function}  done
     */
    passport.deserializeUser(function(id, next) {
        DataService.getUser(id, next, true);
    });

    /*
     * Use the LocalStrategy within Passport.
     *
     * Strategies in passport require a `verify` function, which accept
     * credentials (in this case, a username and password), and invoke a callback
     * with a user object. In the real world, this would query a database;
     * however, in this example we are using a baked-in set of users.
     */
    passport.use(new LocalStrategy({
        /**
         * Constructor function for LocalStrategy. Basically this just try to find
         * specified user and validate user password if user is found.
         *
         * @param  {String}    username
         * @param  {String}    password
         * @param  {Function}  next
         */
        usernameField: 'email'
    },
            function(username, password, next) {
            /**
             * Find the user by username. If there is no user with the given
             * username, or the password is not correct, set the user to `false` to
             * indicate failure and set a flash message. Otherwise, return the
             * authenticated `user`.
             */
            DataService.getUser({email: username}, function(error, user) {
                var message = null;

                if (!user) { // User not found
                    user = false;

                    message = { message: "The email " + username +" has not been registered with us." };
                } else if (!user.validPassword(password)) { // Password does not match
                    user = false;

                    message = { message: "Invalid password" };
                }

                return next(error, user, message);
            }, true);
        }
    ));

    /**
     * Passport Remember Me cookie strategy.
     *
     * This strategy consumes a remember me token, supplying the user the token was originally
     * issued to. The token is single-use, so a new token is then issued to replace it.
     */
    passport.use(new RememberMeStrategy(
        function(token, next) {
            AuthService.consumeRememberMeToken(token, function(error, uid) {
                if (error) {
                    return next(error);
                }

                if (!uid) {
                    return next(null, false);
                }

                DataService.getUser(uid, function(error, user) {
                    if (error) {
                        return next(error);
                    }

                    if (!user) {
                        return next(null, false);
                    }

                    return next(null, user);
                }, true);
            });
        },
        AuthService.issueToken
    ));

    // Make necessary Taskboard init
    //TaskboardInitService.init(cb);
    cb();
};