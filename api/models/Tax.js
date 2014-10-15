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
        level: {
            type: 'integer'
        },
        name: {
            type: "string",
            required: true
        },
        state: {
            type: "string"
        },
        country: {
            type: "string"
        },
        taxrate: {
            type: "float"
        }

    }

});