/**
 * Ticketstatuses
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";


module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
    attributes: {
        title: {
            type: "string",
            required: true,
            unique: true
        },
        color: {
            type: "string"
        },
        sortorder: {
            type: "integer"
        },
        showactive: {
            type: "integer"
        },
        autoclose: {
            type: "integer"
        }

    }
});