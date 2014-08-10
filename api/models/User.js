/**
 * User
 *
 * @module      ::  Model
 * @description ::  Model to represents taskboard user.
 * @docs        ::  http://sailsjs.org/#!documentation/models
 */
"use strict";

var bcrypt = require("bcrypt");
var _ = require("lodash");

/**
 * Generic password hash function.
 *
 * @param   {sails.model.user}  values
 * @param   {Function}          next
 */
function hashPassword(values, next) {
    bcrypt.hash(values.password, 10, function(error, hash) {
        if (error) {
            sails.log.error(__filename + ":" + __line + " [Password hashing failed]");
            sails.log.error(error);

            return next(error);
        }

        values.password = hash;

        return next();
    });
}

module.exports = _.merge(_.cloneDeep(require("../services/baseModel")), {
    attributes: {
        firstname: {
            type:       "string"
            //required:   true
        },
        lastname: {
            type:       "string"
            //required:   true
        },
        email: {
            type:       "email",
            required:   true,
            unique:     true
        },
        admin: {
            type:       "boolean",
            defaultsTo: false
        },
        password: {
            type:       "string",
            required:   false,
            min: 5
        },
        language: {
            type:       "string",
            defaultsTo: "en",
            required:   true
        },
        sessionId: {
            type:       "string",
            defaultsTo: ""
        },
        theme: {
            type: 'string',
            defaultsTo: 'false'
        },
        status: {
            type: 'string',
            enum: ['Active', 'Inactive', 'Closed']
        },
        country: {
            type: 'string'
        },
        currency: {
            type: 'integer',
            defaultsTo: '1'
        },
        credit: {
            type: 'float',
            defaultsTo: '0.00'
        },
        emailoptout: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        // Dynamic data attributes

        // Computed user fullName string
        fullname: function() {
            return this.lastName + " " + this.firstName;
        },


        // Override toJSON instance method to remove password value
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.sessionId;

            return obj;
        },

        // Validate password
        validPassword: function(password, callback) {
            var obj = this.toObject();

            if (callback) {
                return bcrypt.compare(password, obj.password, callback);
            } else {
                return bcrypt.compareSync(password, obj.password);
            }
        }
    },

    // Life cycle callbacks

    /**
     * Before create callback.
     *
     * @param   {sails.model.user}  values
     * @param   {Function}          next
     */
    beforeCreate: function(values, next) {
        hashPassword(values, next);
    },

    /**
     * Before update callback.
     *
     * @param   {sails.model.user}  values
     * @param   {Function}          next
     */
    beforeUpdate: function(values, next) {
        if (values.id) {
            DataService.getUser(values.id, function(error, user) {
                if (!error) {
                    // User try to make himself an administrator user, no-way-hose :D
                    if (values.admin && !user.admin) {
                        values.admin = false;
                    }

                    if (values.password) {
                        return hashPassword(values, next);
                    } else {
                        values.password = user.password;
                    }
                }

                return next(error);
            });
        } else {
            next();
        }
    },

    /**
     * After create callback.
     *
     * @param   {sails.model.user}  values
     * @param   {Function}          next
     */
    afterCreate: function(values, next) {
        HistoryService.write("User", values);

        next();
    },

    /**
     * After update callback.
     *
     * @param   {sails.model.user}  values
     * @param   {Function}          next
     */
    afterUpdate: function(values, next) {
        HistoryService.write("User", values);

        next();
    },

    /**
     * Before destroy callback.
     *
     * @param   {{}}        terms
     * @param   {Function}  next
     */
    beforeDestroy: function(terms, next) {
        DataService.getUser(terms, function(error, user) {
            if (!error) {
                HistoryService.remove("User", user.id);
            }

            next(error);
        });
    }
});