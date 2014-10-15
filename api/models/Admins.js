/**
 * Admin Role
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";



module.exports =  {
    attributes: {
        user: {
          model: 'user'
        },
        signature: {
            type: "text"
        },
        notes: {
            type: "text"
        },
        disabled: {
            type: "boolean",
            defaultsTo: 0
        },
        loginattempts: {
            type: "boolean"
        },
        supportdepts: {
            type: "text"
        },
        ticketnotifications: {
            type: "text"
        },
        homewidgets: {
            type: "array"
        },
        role: {
            model: 'adminrole'
        }
    }

};