/**
 * Backups
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */


var Category = {
    attributes: {
        gearid: {
            type: 'string',
            required: true
        },
        size: {
            type: 'INTEGER'
        },
        date: {
            type: 'datetime'
        }
    }
};

module.exports = Category;