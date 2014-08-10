/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
function safeFilename(name) {
    name = name.replace(/ /g, '-');
    name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
    name = name.replace(/\.+/g, '.');
    name = name.replace(/-+/g, '-');
    name = name.replace(/_+/g, '_');
    return name;
}

function fileMinusExt(fileName) {
    return fileName.split('.').slice(0, -1).join('.');
}

function fileExtension(fileName) {
    return fileName.split('.').slice(-1);
}

module.exports = {



    /**
     * `FileController.upload()`
     *
     * Upload file(s) to the server's disk.
     */
    upload: function (req, res) {

        // e.g.
        // 0 => infinite
        // 240000 => 4 minutes (240,000 miliseconds)
        // etc.
        //
        // Node defaults to 2 minutes.
        res.setTimeout(0);

        req.file('avatar')
            .upload({

                // You can apply a file upload limit (in bytes)
                maxBytes: 1000000

            }, function whenDone(err, uploadedFiles) {
                if (err) return res.serverError(err);
                else return res.json({
                    files: uploadedFiles,
                    textParams: req.params.all()
                });
            });
    },

    /**
     * `FileController.s3upload()`
     *
     * Upload file(s) to an S3 bucket.
     *
     * NOTE:
     * If this is a really big file, you'll want to change
     * the TCP connection timeout.  This is demonstrated as the
     * first line of the action below.
     */
    s3upload: function (req, res) {

        // e.g.
        // 0 => infinite
        // 240000 => 4 minutes (240,000 miliseconds)
        // etc.
        //
        // Node defaults to 2 minutes.
        res.setTimeout(0);

        req.file('avatar').upload({
            adapter: require('skipper-s3'),
            bucket: process.env.BUCKET,
            key: process.env.KEY,
            secret: process.env.SECRET
        }, function whenDone(err, uploadedFiles) {
            if (err) return res.serverError(err);
            else return res.json({
                files: uploadedFiles,
                textParams: req.params.all()
            });
        });
    },


    /**
     * FileController.download()
     *
     * Download a file from the server's disk.
     */
    download: function (req, res) {
        require('fs').createReadStream(req.param('path'))
            .on('error', function (err) {
                return res.serverError(err);
            })
            .pipe(res);
    }
};
