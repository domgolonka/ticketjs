var path = require("path");

module.exports = {
        getSearch: function(req, res)
    {

        var items = [],
            record;

        res.locals.matches = [];
        res.locals.term = req.query.term.trim();

        if (res.locals.term.length < 2) {

            res.locals.warning = "Search string is too short.";
            renderResults();
        } else {

            Wiki.find(res.locals.term).then(function (items) {

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
            res.view("wiki/search", {
                layout: 'layout-front',
                site: 'wiki',
                title: "Search results"
            });
        }
    }

};