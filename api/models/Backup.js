/**
 * Backups
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var ssh     = require('ssh2'),
    fs      = require('fs'),
    mkdirp  = require('mkdirp');

var Backup = {
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

module.exports = Backup;