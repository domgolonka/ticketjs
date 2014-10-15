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
            type:   "integer",
            required: true
        },
        invoicenum: {
            type: 'integer'
        },
        date: {
            type: 'datetime'
        },
        duedate: {
            type: 'datetime'
        },
        datepaid: {
            type:   "datetime"
        },
        subtotal: {
            type:   "float"
        },
        tax: {
            type:   "float"
        },
        tax2: {
            type:   "float"
        },
        total: {
            type:   "float"
        },
        taxrate: {
            type:   "float"
        },
        taxrate2: {
            type:   "float"
        },
        status: {
            type:   "string"
        },
        paymentmethod: {
            type:   "string"
        },
        notes: {
            type:   "text"
        }

    }
};