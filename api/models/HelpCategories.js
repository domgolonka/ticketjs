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
        help: {
            collection: 'help',
            via: 'categories'
        },
        faq: {
          collection: 'faq',
          via: 'categories'
        }

    }

};
