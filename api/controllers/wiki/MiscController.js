var fs = require("fs");


module.exports = {
    getSyntaxReference: function (req, res)
    {
        res.view('wiki/mixin/syntax', {
            layout: ''
        });
    },

    postPreview: function (req, res) {
        res.view('wiki/preview', {
            content: req.body.data,
           layout: ''
        });
    },

    getExistence: function (req, res) {

        if (!req.query.data) {
            res.send(JSON.stringify({data: []}));
            return;
        }

        var result = [],
            page,
            n = req.query.data.length;

        req.query.data.forEach(function (pageName, idx) {
            (function (name, index) {
                Wiki
                    .findOne(name)
                    .exec(function(error, page) {
                        if (error) {
                            sails.log.error(__filename + ":" + __line + " [Failed to fetch Get Wiki Page]");
                            sails.log.error(error);
                        } else if (!page) {
                            error = new Error();

                            error.message = "Page not Found.";
                            error.status = 404;
                        }

                            if (!fs.existsSync(page.pathname)) {
                                result.push(name);
                            }
                            if (index == (n - 1)) {
                                res.send(JSON.stringify({data: result}));
                            }
                        })(pageName, idx);
                    });

        });
    }


};