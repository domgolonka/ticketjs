/**
 * BackupsController
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
var fs = require('fs');

module.exports = {
    download: function(req, res){
        var data = {};
        data.title = "Download Backup";

        Backup.findOne({id: req.route.params.id}).done(function (err, backup){
            if (err || !backup) {
                data.message = "Backup not found";
                return res.notFound(data);
            } else {
                var path  = "";
                path += backup.date.getFullYear() + "/";
                path += ("0" + backup.date.getMonth()+1).slice(-2) + "/";
                path += ("0" + backup.date.getDate()).slice(-2) + "/";
                path += backup.id + ".tar.gz";

                Gear.findOne({id: backup.gearid}).done(function (err, gear){
                    var downloadName  = "";
                    if (err || !gear) {
                        // If we cannot find the gear in the database but the backup is still there
                        // Allow an admin to download the snapshot.
                        // Anyone else would have already hit a 403 due to the policies
                        downloadName += backup.id + ".tar.gz";
                    } else {
                        downloadName += gear.name + "-";
                        downloadName += backup.date.getFullYear() + "-";
                        downloadName += ("0" + backup.date.getMonth()+1).slice(-2) + "-";
                        downloadName += ("0" + backup.date.getDate()).slice(-2) + ".tar.gz";
                    }
                    fs.exists(path, function (fileEists){
                        if (fileEists) {
                            return res.download(path, downloadName);
                        } else {
                            data.message = "Backup not found";
                            return res.notFound(data);
                        }
                    });
                });
            }
        });
    },

    create: function(req, res){
        var data = {};
        var isApi =  (req.isSocket || req.isAjax || res.isJson);
        if (!isApi)
            data.IsLoggedIn = req.isAuthenticated();

        if (!req.param.id)
            return (isApi) ? res.status(500).view("500", data) : res.status(500);

        Gear.findOne({id: backup.gearid}).done(function findGear(err, gear){
            if (err) {
                sails.log.error(err);
                data.message = err;
                return (isApi) ? res.status(500).view("500", data) : res.status(500);
            } else {
                backup.date = new Date();
                var path  = process.env.OPENSHIFT_DATA_DIR + "backups/";
                path += backup.date.getFullYear() + "/";
                path += ("0" + backup.date.getMonth()+1).slice(-2) + "/";
                path += ("0" + backup.date.getDate()).slice(-2) + "/";
                var name  = backup.id + ".tar.gz";

                try{
                    mkdirp.sync(backupPath, '0770');
                    var sshConnection = new ssh();
                    sshConnection.on('ready', function SSHConnected(){
                        sshConnection.exec('snapshot', function(err, stream){
                            if (err) throw (err);
                            stream.on('data', function getSnapshot(data, extended){
                                if (extended != 'stderr') fs.appendFileSync(path + name, data, null);
                            });
                            stream.on('exit', function finishedSnapshot(){
                                backup.size = fs.statSync(path + name).size;
                            });
                        });
                    });
                    sshConnection.connect({
                        host: gear.name + "-" + gear.namespace + "." + gear.domain,
                        port: 22,
                        username: gear.uuid,
                        privateKey: fs.readFileSync(process.env.OPENSHIFT_DATA_DIR + ".ssh/osbs_id_rsa")
                    });
                } catch (err) {
                    sails.log.error(err);
                    cb(err);
                }
            }
        });
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to BackupsController)
     */
    _config: {}


};