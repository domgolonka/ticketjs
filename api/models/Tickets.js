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
        tid: {
            type: "string",
            required: true
        },
        did: {
            type: "integer",
            required: true
        },
        userid: {
            type: "integer",
            required: true
        },
        email: {
            type: "email",
            required: true,
            unique: true
        },
        date: {
            type: "datetime"
        },
        title: {
            type: "string"
        },
        message: {
            type: "string"
        },
        status: {
            type: "string"
        },
        urgency: {
            type: "string"
        },
        attachment: {
            type: "string"
        },
        lastreply: {
            type: "datetime"
        },
        clientunread: {
            type: "integer",
            defaultsTo: '1'
        },
        adminunread: {
            type: "string",
            defaultsTo: '1'
        },
        replayingadmin: {
            type: "string"
        },
        replyingtime: {
            type: "datetime"
        },
        service: {
            type: "string"
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