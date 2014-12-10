var async = require("async");
module.exports = {
        getHelp: function (req, res) {
            DataService.getHelpList(0, function (err, helplist) {
                if (err) {
                    ResponseService.makeError(err, req, res);
                } else {
                    res.view("help/index", {
                        user: req.user,
                        layout: 'layout-front',
                        site: 'help',
                        helplist: helplist.list
                    });
                }
            });
        },
            getHistory: function(req, res)
        {

            var page = new Help._model(req.params.page);

            page.fetch().then(function () {

                return page.fetchHistory();
            }).then(function (history) {

                // FIXME better manage an error here
                if (!page.error) {
                    res.view("help/history", {
                        user: req.user,
                        layout: 'layout-front',
                        items: history,
                        site: 'help',
                        page: page

                    });
                } else {
                    res.locals.title = "404 - Not found";
                    res.statusCode = 404;
                    res.view("404");
                }
            });
        },
        getFaq: function (req, res) {
            DataService.getFaqList(0, function (err, faqlist) {
                if (err) {
                    ResponseService.makeError(err, req, res);
                } else {
                    //sails.log.error(faqlist);
                    res.view("help/faq", {
                        user: req.user,
                        layout: 'layout-front',
                        site: 'help',
                        faqlist: faqlist
                    });
                }
            });
        },
        getWiki:  function(req, res) {

            var items = [];
            var pagen = 0 | req.query.page;

            async.parallel(
                {
                    // fetch help list
                    helplinks: function (callback) {
                        DataService.getHelpList(0, callback);
                    },
                    itemsperpage: function(callback) {
                        DataService.getConfig('helpitemsperpage', callback);
                    }
                },


            function(error, data) {
                if (error) {
                    ResponseService.makeError(error, req, res);
                } else {
                    Help.count().exec(function (err, totalcount) {
                        var itemsPerPage = data.itemsperpage;
                        var total = totalcount;
                        var totalPages = Math.ceil(total / itemsPerPage);

                        if (pagen <= 0) {
                            pagen = 1;
                        }
                        if (pagen > totalPages) {
                            pagen = totalPages;
                        }

                        currentPage = pagen;

                        res.view("help/list", {
                            user: req.user,
                            layout: 'layout-front',
                            items: data.helplinks,
                            site: 'help',
                            total: total,
                            pageNumbers: Array.apply(null, Array(totalPages)).map(function (x, i) {
                             return i + 1;
                             }),
                            pageCurrent: currentPage
                        });
                    });

                }
            }
            );
        },

        getHelpPage: function (req, res) {

            //var page = new Help._model(req.params.page, req.params.version);

            async.parallel(
                {
                    // Fetch single user data
                    page: function(callback) {
                        DataService.getHelpPage(req.params.page, callback);
                    }
                },
                function (error, data) {
                    if (error) {
                        if (req.user) {

                            // Try sorting out redirect loops with case insentive fs
                            // Path 'xxxxx.md' exists on disk, but not in 'HEAD'.
                            /*if (/but not in 'HEAD'/.test(page.error)) {
                                page.setNames(page.name.slice(0, 1).toUpperCase() + page.name.slice(1));
                            }*/
                            res.redirect("/help/pages/new/"+req.params.page);
                        } else {

                            res.redirect("/help/"); // NEEDS TO BE CHANGED
                        }

                    } else {

                    /*res.locals.canEdit = true;
                    if (data.page.revision != "HEAD") {
                        res.locals.warning = "You're not reading the latest revision of this page, which is " + "<a href='" + page.urlForShow() + "'>here</a>.";
                        res.locals.canEdit = false;
                    }

                    res.locals.notice = req.session.notice;
                    delete req.session.notice;
                    */
                    var content = Renderer.render("#" + data.page.title + "\n" + data.page.content);
                    res.view("help/show", {
                        user: req.user,
                        layout: 'layout-front',
                        page: data.page,
                        site: 'help',
                        title: sails.config.appName + " – " + data.page.title,
                        content: content,
                        contentitems: Renderer.matchHeader(content)

                    });
                }
            });
        },

        getCompare: function (req, res) {

            var revisions = req.params.revisions;

            var page = new Help._model(req.params.page);

            page.fetch().then(function () {

                return page.fetchRevisionsDiff(req.params.revisions);
            }).then(function (diff) {
                if (!page.error) {

                    var lines = [];
                    diff.split("\n").slice(4).forEach(function (line) {

                        if (line.slice(0, 1) != '\\') {
                            lines.push({
                                text: line,
                                ldln: leftDiffLineNumber(0, line),
                                rdln: rightDiffLineNumber(0, line),
                                className: lineClass(line)
                            });
                        }
                    });

                    var revs = req.params.revisions.split("..");
                    res.view('view/compare', {
                        user: req.session.user,
                        page: page,
                        site: 'help',
                        lines: lines,
                        revs: revs
                    });

                }
                else {
                    res.locals.title = "404 - Not found";
                    res.statusCode = 404;
                    res.view('404');
                    return;
                }
            });

            var ldln = 0,
                cdln;

            function leftDiffLineNumber(id, line) {

                var li;

                switch (true) {

                    case line.slice(0, 2) == '@@':
                        li = line.match(/\-(\d+)/)[1];
                        ldln = parseInt(li, 10);
                        cdln = ldln;
                        return '...';

                    case line.slice(0, 1) == '+':
                        return "";

                    case line.slice(0, 1) == '-':
                    default:
                        ldln++;
                        cdln = ldln - 1;
                        return cdln;
                }
            }

            var rdln = 0;

            function rightDiffLineNumber(id, line) {

                var ri;

                switch (true) {

                    case line.slice(0, 2) == '@@':
                        ri = line.match(/\+(\d+)/)[1];
                        rdln = parseInt(ri, 10);
                        cdln = rdln;
                        return '...';

                    case line.slice(0, 1) == '-':
                        return ' ';

                    case line.slice(0, 1) == '+':
                    default:
                        rdln += 1;
                        cdln = rdln - 1;
                        return cdln;
                }
            }

            function lineClass(line) {
                if (line.slice(0, 2) === '@@') {
                    return "gc";
                }
                if (line.slice(0, 1) === '-') {
                    return "gd";
                }
                if (line.slice(0, 1) === '+') {
                    return "gi";
                }
            }
        }
};
