/**
 * HomeController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */
"use strict";

var passport = require("passport");

module.exports = {
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AuthController)
     */

    _config: {
        blueprints: {
            rest: false
        }
    },

    /*
     * Registers the user
     */
    getregister: function (req, res) {
        if (req.user) {
            res.redirect("/");
        }
        var countries  = require('country-data').countries;


        res.view('auth/register',{
            countries: countries.all,
            layout: 'layout-front'
        });
    },
    /*
     *   Post REGISTER
     */
    /*signup: function (req, res) {
     var username = req.param("username");
     var password = req.param("password");

     Users.findByUsername(username).done(function(err, usr){
     if (err) {
     res.send(500, { error: "DB Error" });
     } else if (usr) {
     res.send(400, {error: "Username already Taken"});
     } else {
     var hasher = require("password-hash");
     password = hasher.generate(password);

     Users.create({username: username, password: password}).done(function(error, user) {
     if (error) {
     res.send(500, {error: "DB Error"});
     } else {
     req.session.user = user;
     res.send(user);
     }
     });
     }
     });
     } */
    postregister: function (request, response) {
        if (request.user) {
            response.redirect("/");
        }
        var email    = request.param('email'),
            password = request.param('password'),
            firstname = request.param('firstname'),
            lastname = request.param('lastname'),
            country = request.param('country');
        if (!email) {
            return response.json("ERROR EMAIL MISSING");
        }
        if (!password) {
            return response.json("ERROR PASSWORD MISSING");
        }
        DataService.getUser({email: email}, function(err,user){
            if (err) {
                ResponseService.makeError(err, request, response);
            } else  if (!user) {
                User.create({
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    status    : 'Active',
                    updatedUserId: 0,
                    createdUserId: 0
                }).exec(function (err, user) {
                    if (err) {
                        ResponseService.makeError(err, request, response);
                    } else {
                        request.session.me = user.id;
                        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
                        // send a 200 response letting the user agent know the signup was successful.
                        if (request.wantsJSON) {
                            return response.ok('Signup successful!');
                        }

                        passport.authenticate("local", function(error, user, info) {
                            if ((error) || (!user)) {
                                sails.log.error("Login failed: " + __filename + ":" + __line);
                                sails.log.error(info);

                                request.flash.message("Invalid credentials", "error");

                                response.cookie("message", {message: "Invalid credentials", type: "error", options: {}});
                                response.redirect("/login");

                                return;
                            }

                            request.logIn(user, function(error) {
                                if (error) {
                                    sails.log.error("Login failed: " + __filename + ":" + __line);
                                    sails.log.error(error);

                                    request.flash.message("Login fail...", "error");

                                    response.cookie("message", {message: "Login fail...", type: "error", options: {}});
                                    response.redirect("/login");
                                } else {
                                    // Update current session id to user data
                                    User.update({id: user.id}, {sessionId: request.sessionID}, function(error, users) {
                                        // Oh nou error
                                        if (error || users.length !== 1) {
                                            sails.log.error("Login failed: " + __filename + ":" + __line);
                                            sails.log.error(error);

                                            response.redirect("/logout");
                                        } else { // Otherwise redirect user to main page
                                            // Write user sign in log
                                            LoggerService.userSignIn(user, request);


                                            request.flash.message("Successfully sign in", "success");

                                            response.cookie("message", {message: "Successfully sign in", type: "success", options: {}});
                                            response.redirect("/");
                                        }
                                    });
                                }
                            });
                        })(request, response);
                    }
                });
            }
        }, true);


    },
    /**
     * Index page
     *
     * @param   {Request}   request     Request object
     * @param   {Response}  response    Response object
     */
    index: function(request, response) {

        response.view({
            keywords: "seedbox, seedbox hosting",
            description: "Seedmybox",
            layout: 'layout-front'
        });
    }
};