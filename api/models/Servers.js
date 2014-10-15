/**
 * Ticket
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";



module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
    attributes: {
        name: {
            type: 'string'
        },
        ipaddress: {
            type: "text",
            required: true
        },
        assignedips: {
            type: "text"
        },
        hostname: {
            type: "string"
        },
        monthlycost: {
            type: "float"
        },
        maxaccounts: {
            type: "integer"
        },
        type: {
            type: "string"
        },
        username: {
            type: "string"
        },
        password: {
            type: "text"
        },
        secure: {
            type: "booleam",
            required: true
        },
        active: {
            type: "boolean"
        },
        disabled: {
            type: "boolean"
        }
    }

});