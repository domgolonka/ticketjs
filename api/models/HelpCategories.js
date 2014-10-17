/**
 * Ticket
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";



module.exports =  {
    attributes: {
        name: {
            type: "string"
        },
        description: {
            type: "text"
        },
        hidden: {
            type: "boolean",
            defaultsTo: 0
        },
        language: {
            type: "string",
            defaultsTo: "en"
        },
        type: {
            type: "string"
        },
        list: {
            collection: 'help',
            via: 'categories'
        }

    }

};
