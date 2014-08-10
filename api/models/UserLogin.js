/**
 * UserLogin
 *
 * @module      ::  Model
 * @description ::  This model contains information about user login to Taskboard
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";

module.exports = {
    schema: true,
    attributes: {
        userId: {
            type:   "integer"
        },
        lastlogin: {
            type: 'datetime'
        },
        ip: {
            type: 'string'
        },
        host: {
            type: 'string'
        },
        agent: {
            type:   "text"
        },

        // Dynamic data attributes

        stampObject: function() {
            return (this.stamp && this.stamp != "0000-00-00 00:00:00")
                ? DateService.convertDateObjectToUtc(this.lastlogin) : null;
        },
        createdAtObject: function() {
            return (this.createdAt && this.createdAt != "0000-00-00 00:00:00")
                ? DateService.convertDateObjectToUtc(this.createdAt) : null;
        },
        updatedAtObject: function() {
            return (this.updatedAt && this.updatedAt != "0000-00-00 00:00:00")
                ? DateService.convertDateObjectToUtc(this.updatedAt) : null;
        }
    }
};