'use strict';
/**
 * ImageController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
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
var ensureDir = require('ensureDir');

/* globals sails, Images */
module.exports = {
    create: function (req, res) {

        function saveFile(fileData, callback) {
            var directory = './.tmp/data/uploads/images/';
            ensureDir(directory, function (err) {
                if (err) {
                    return err;
                }
                var options = {
                    // hack since the default directory is ./tmp/uploads
                    dirname: '../../' + directory
                };
                fileData.upload(options, function(err, uploadedFiles) {
                    if (err) {
                        res.json({status: 400, error: err});
                    }
                    var fileObject = uploadedFiles[0];
                    var fd = '' + fileObject.fd;
                    var fileName = fd.substring(fd.lastIndexOf('/')+1);

                    Images.create({src: '/uploads/images/' + fileName})
                        .exec(function (err, persistedImage) {
                            if (err) {
                                sails.log.error('Error creating image object.', err);
                                return res.json({status: 400, error: err});
                            }
                            callback(persistedImage);
                        });
                });
            });
        }

        saveFile(req.file('file'), function (imageRef) {
            res.json(imageRef);
        });
    },
    _config: {}
};