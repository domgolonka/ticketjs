/**
 * baseModel
 *
 * @module      ::  Model
 * @description ::  This is a base model for all models to use. Purpose of this is to provide
 *                  some common attributes (static / dynamic) for all models that application
 *                  uses. Usage in actual models:
 *
 *                  var _ = require("lodash");
 *
 *                  module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
 *                      attributes: {
 *                          ...
 *                      }
 *                  });
 *
 * @docs        ::  http://sailsjs.org/#!documentation/models
 *                  https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE
 */
"use strict";

module.exports = {
    schema: true,

    attributes: {
        createdUserId: {
            type:       "integer",
            required:   true
        },
        updatedUserId: {
            type:       "integer",
            required:   true
        },

        // Dynamic model data attributes

        objectTitle: function() {
            var output = null;

            if (this.title) {
                output = this.title;
            } else if (this.lastname) { // Small hack for User model
                output = this.lastname + " " + this.firstname;
            }

            return output;
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