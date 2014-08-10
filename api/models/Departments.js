/**
 * Departments
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";



module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
    attributes: {
        name: {
            type: "string",
            required: true,
            unique: true
        },
        description: {
            type: "string",
        },
        email: {
            type: "email",
            required: true
        },
        clientsonly: {
            type: "boolean",
            defaultsTo: false
        },
        hidden: {
            type: "boolean",
            defaultsTo: false
        },
        order: {
            type: "integer"
        },
        host: {
            type: "string",
            defaultsTo: "localhost",
            required: true
        },
        port: {
            type: "string",
            defaultsTo: "587"
        },
        login: {
            type: 'string'
        },
        password: {
            type: 'string'
        },


        // Override toJSON instance method to remove password value
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.sessionId;

            return obj;
        }
    }

});