/**
 * AdminController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var async = require('async');

module.exports = {

    users: function(req, res) {
        // TODO: Use pages with jsonp
        var data = {};
        data.title = "User Manager";

        User.find({}).done(function (err, users){
            if (err || users.length < 1) {
                data.message = "User not found";
                return res.notFound(data);
            }
            data.users = users;
            return res.ok(data, 'admin/users');
        });
    },

    useradd: function(req, res) {
        var data = {};
        data.groups = ['admin', 'user'];
        data.title = "Create User";
        Gear.find({}).done(function (err, gears){
            if (err) {
                return res.ok(data, 'admin/useradd');
            } else {
                async.each(gears, function(gear, cb){
                    data.groups[data.groups.length] = gear.name;
                    cb();
                }, function (err){
                    if (err) return res.serverError(data);
                    return res.ok(data, 'admin/useradd');
                });
            }
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AdminController)
     */
    _config: {}


};