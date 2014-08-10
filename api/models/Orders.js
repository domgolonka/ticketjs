/**
 * Orders
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
        ordernum: {
            type: 'integer'
        },
        date: {
            type: 'datetime'
        },
        promocode: {
            type: 'text'
        },
        promotype: {
            type:   "text"
        },
        promovalue: {
            type:   "text"
        },
        paymentmethod: {
            type:   "text"
        },
        amount: {
            type:   "float"
        },
        invoiceid: {
            type:   "integer"
        },
        status: {
            type:   "text"
        },
        notes: {
            type:   "text"
        },

    }
};