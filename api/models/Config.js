/**
 * Config
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";



module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
    attributes: {
        setting: {
            type: 'text'
        },
        value: {
            type: "text"
        }
    }

});