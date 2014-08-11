/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

    "*": ["flashMessage"],

    "Home": {
        "*": true,
        // Register
        getregister: ["flashMessage"],
        postregister: ["flashMessage"]
    },
    "Panel": {
        "*": false,

        // Custom actions
        index:          ["flashMessage","authenticated"]
    },
    // whitelist the auth controller, this is used for login
    "Auth": {
        "*": true,

        // Custom actions
        login:          ["flashMessage"],
        logout:         [true],
        authenticate:   [true]
    },
    "Validator": {
        // By default do not allow nothing
        "*":            false,

        // Custom actions
        isUnique:       ["flashMessage", "authenticated", "isAjax"],
        passwordCheck:  ["flashMessage", "authenticated", "isAjax", "hasUserAdminOrItself"]
    },
    // User controller policies
    "User": {
        // By default do not allow nothing
        "*":        false,
        // Register
        getregister: ["flashMessage"],
        postregister: ["flashMessage"],
        // Default handling for blueprints
        find:       ["flashMessage", "authenticated", "isAjaxOrSocket"],
        create:     ["flashMessage", "authenticated", "isAjaxOrSocket", "hasUserAdmin", "addUserDataCreate"],
        update:     ["flashMessage", "authenticated", "isAjaxOrSocket", "hasUserAdminOrItself", "addUserDataUpdate"],
        destroy:    ["flashMessage", "authenticated", "isAjaxOrSocket", "hasUserAdmin"],

        // Custom actions
        list:           ["flashMessage", "authenticated", "isAjax", "hasUserAdmin"],
        add:            ["flashMessage", "authenticated", "isAjax", "hasUserAdmin"],
        edit:           ["flashMessage", "authenticated", "isAjax", "hasUserAdminOrItself"],
        history:        ["flashMessage", "authenticated", "isAjax", "hasUserAdminOrItself"],
        projects:       ["flashMessage", "authenticated", "isAjax", "hasUserAdminOrItself"],
        changePassword: ["flashMessage", "authenticated", "isAjax", "hasUserAdminOrItself"]
    }
};
