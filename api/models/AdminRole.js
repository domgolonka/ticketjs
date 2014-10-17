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
        name: {
            type: 'text'
        },
        widgets: {
            type: "array"
        },
        systememails: {
            type: "boolean"
        },
        accountemails: {
            type: "boolean"
        },
        supportemails: {
            type: "boolean"
        },
        edithelp: {
            type: "boolean"
        },
        list: {
            collection: 'admins',
            via: 'role'
        }
    }

};