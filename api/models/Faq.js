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
        name: {
          type:       "text",
          required:   true
        },
        question: {
            type:       "text",
            required:   true
        },
        // Reference to object id.
        answer: {
            type:       "text",
            required:   true
        },
        // Object data which was saved, optionally with message
        views: {
            type:       "integer"
        },
        // History message, optionally with objectData
        votes: {
            type:       "text"
        },
        active: {
            type:       "boolean",
            defaultsto: 'true'
        },
        language: {
            type:       "string",
            defaultsto: 'en'
        },
        userId: {
            type:       "integer",
            required: true
        },
        categories: {
          model: 'helpcategories'
        },
        // Dynamic data attributes

        createdAtObject: function () {
            return (this.createdAt && this.createdAt != "0000-00-00 00:00:00")
                ? DateService.convertDateObjectToUtc(this.createdAt) : null;
        },
        updatedAtObject: function () {
            return (this.updatedAt && this.updatedAt != "0000-00-00 00:00:00")
                ? DateService.convertDateObjectToUtc(this.updatedAt) : null;
        }
    }
};
