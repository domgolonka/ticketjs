/**
 * ProfileController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */
"use strict";

module.exports = {
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AuthController)
     */

    _config: {

    },

    /**
     * Index page
     *
     * @param   {Request}   request     Request object
     * @param   {Response}  response    Response object
     */
    index: function(request, response) {

        response.view("panel/index", {
            keywords: "seedbox, seedbox hosting",
            description: "Seedmybox"
        });
    }
};