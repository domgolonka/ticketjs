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
        type: {
            type: 'string',
            enum: ['product', 'addon', 'configoptions']
        },
        currency: {
            type: "integer",
            required: true
        },
        groupid: {
            type: "integer",
            required: true
        },
        weekly: {
            type: "float"
        },
        monthly: {
            type: "float"
        },
        quarterly: {
            type: "float"
        },
        semiannually: {
            type: "float"
        },
        annually: {
            type: "float"
        },
        biennially: {
            type: "float"
        },
        triennially: {
            type: "float"
        }

    }

});