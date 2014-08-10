/**
 * TicketReplies
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
            required: true,
            unique: true
        },
        userid: {
            type: "integer"
        },
        contactid: {
            type: "integer"
        },
        date: {
            type: "datetime"
        },
        message: {
            type: "string"
        },
        admin: {
            type: "string"
        },
        attachment: {
            type: "string"
        },
        rating: {
            type: "integer"
        }

    }
});