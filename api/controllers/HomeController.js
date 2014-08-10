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
    /**
     * Index page
     *
     * @param   {Request}   request     Request object
     * @param   {Response}  response    Response object
     */
    index: function(request, response) {

        response.view({
            keywords: "seedbox, seedbox hosting",
            description: "Seedmybox"
        });
    }
};