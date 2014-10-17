var path = require("path"),
    sanitizer = require('sanitizer');
module.exports = {
        getS: function(req, res) {
                Help.query('SELECT help.title from help where help.title like "%'+req.query.key+'%"',
                    function(err, rows, fields) {
                        if (err) throw err;
                        var data=[];
                        for(i=0;i<rows.length;i++)
                        {
                            data.push(rows[i].title);
                        }
                        res.end(JSON.stringify(data));
                    });
        },
        getSearch: function(req, res)
    {
        var items = [],
            record;

        res.locals.matches = [];
        res.locals.term = req.query.term;

        if (res.locals.term.length < 2) {

            res.locals.warning = "Search string is too short.";
            renderResults();
        } else {

            Help.find(res.locals.term).then(function (items) {
                items.forEach(function (item) {
                    if (item.trim() !== "") {
                        record = item.split(":");
                        res.locals.matches.push({
                            pageName: path.basename(record[0].split(".")[0]),
                            line: record[1] ? ":" + record[1] : "",
                            text: record.slice(2).join('')
                        });
                    }
                });

                renderResults();
            });
        }

        function renderResults() {
            res.view("help/search", {
                layout: 'layout-front',
                site: 'help',
                title: "Search results"
            });
        }
    }

};