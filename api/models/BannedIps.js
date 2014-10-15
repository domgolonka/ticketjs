/**
 * Category
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
        // Object data which was saved, optionally with message
        ip: {
            type:       "text"
        },
        // History message, optionally with objectData
        reason: {
            type:       "text"
        },
        expires: {
            type:       "datetime"
        },
        attributes: {
            posts: {
                collection: 'category',
                via: 'categories'
            }
        }
    }
};