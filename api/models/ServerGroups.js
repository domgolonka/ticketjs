/**
 * FAQ
 *
 * @module      ::  Model
 * @description ::  History model which present specified object history data. Basically this
 *                  model is the _largest_ one in Taskboard application, because every object
 *                  writes history data on create / update events.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";

module.exports = {
    schema: true,
    attributes: {
        // Reference to object, eg. Project, Milestone, Sprint, Story, etc.
        name: {
            type:       "string",
            required:   true
        },
        // Reference to object id.
        filltype: {
            type:       "integer",
            required:   true
        }

    }
};