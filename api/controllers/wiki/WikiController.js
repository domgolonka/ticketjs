var async = require("async");
module.exports = {
            getHistory: function(req, res)
        {

            var page = new Wiki._model(req.params.page);

            page.fetch().then(function () {

                return page.fetchHistory();
            }).then(function (history) {

                // FIXME better manage an error here
                if (!page.error) {
                    res.view("wiki/history", {
                        user: req.user,
                        layout: 'layout-front',
                        items: history,
                        site: 'wiki',
                        page: page

                    });
                } else {
                    res.locals.title = "404 - Not found";
                    res.statusCode = 404;
                    res.view("404");
                }
            });
        },

        getWiki:  function(req, res) {

            var items = [];
            var pagen = 0 | req.query.page;

            async.parallel(
                {
                    // fetch wiki list
                    wikilinks: function (callback) {
                        DataService.getWikiList(0, callback);
                    },
                    itemsperpage: function(callback) {
                        DataService.getConfig('wikiitemsperpage', callback);
                    }
                },


            function(error, data) {
                if (error) {
                    ResponseService.makeError(error, req, res);
                } else {
                    Wiki.count().exec(function (err, totalcount) {
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

                        res.view("wiki/list", {
                            user: req.user,
                            layout: 'layout-front',
                            items: data.wikilinks,
                            site: 'wiki',
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

        getWikiPage: function (req, res) {

            //var page = new Wiki._model(req.params.page, req.params.version);

            async.parallel(
                {
                    // Fetch single user data
                    page: function(callback) {
                        DataService.getWikiPage(req.params.page, callback);
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
                            res.redirect("/wiki/pages/new/"+req.params.page);
                        } else {

                            res.redirect("/wiki/"); // NEEDS TO BE CHANGED
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
                    res.view("wiki/show", {
                        user: req.user,
                        layout: 'layout-front',
                        page: data.page,
                        site: 'wiki',
                        title: sails.config.appName + " – " + data.page.title,
                        content: content,
                        contentitems: Renderer.matchHeader(content)

                    });
                }
            });
        },

        getCompare: function (req, res) {

            var revisions = req.params.revisions;

            var page = new Wiki._model(req.params.page);

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
                        site: 'wiki',
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