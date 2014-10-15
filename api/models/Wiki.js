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
        name: {
            type: "string"
        },
        revision: {
            type: "text"
        },
        content: {
            type: "text"
        },
        title: {
            type: "string"
        },
        error: {
            type: "string"
        },
        hashes: {
            type: "array"
        },
        approved: {
            type: "boolean"
        },
        status: {
            type: "string",
            enum: ['pending', 'approved', 'denied']
        },
        locked: {
            type: "boolean"
        },
        lastCommand: {
            type: "string"
        },
        lastCommitMessage: {
            type: "text"
        },
        categories: {
            model: 'wikicategories'
        }

    }

});
