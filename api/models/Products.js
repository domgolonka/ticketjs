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
            type: 'string'
        },
        gid: {
            type: "integer",
            required: true
        },
        name: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        hidden: {
            type: "boolean"
        },
        welcomeemail: {
            type: "integer"
        },
        stockcontrol: {
            type: "boolean"
        },
        qty: {
            type: "integer"
        },
        paytype: {
            type: "string"
        },
        allowqty: {
            type: "integer"
        },
        servertype: {
            type: "string"
        },
        autosetup: {
            type: "boolean"
        },
        servergroup: {
            type: "integer"
        },
        upgradepackages: {
            type: "json"
        },
        upgradeemail: {
            type: "integer"
        },
        tax: {
            type: "boolean"
        },
        order: {
            type: "integer"
        },
        retired: {
            type: "boolean"
        },


    }

});