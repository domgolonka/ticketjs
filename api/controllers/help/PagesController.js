var sanitizer = require('sanitizer');

module.exports = {
    deletePages: function (req, res) {

        DataService.getHelpPage(req.params.page, function(error, page) {
            if (!page) {
                req.session.notice = "The page cannot be deleted.";
                res.redirect("/help");
                return;
            }

            page.author = req.user.id;

            page.destroy().then(function() {

                LockerSerivce.unlock(page);

                req.session.notice = "The page `" + page.title + "` has been deleted.";
                res.redirect("/help");
            });

        });

    },

    getPagesNew: function (req, res) {

        var  name = "";

        if (req.params.page) {
            // This is not perfect, unfortunately
            name = NamerService.unhelpfy(req.params.page);
            Help.findOne({name:req.params.page})
                .exec(function(error, pageFound) {
                    if (error) {
                        sails.log.error("Help Page Creation failed: " + __filename + ":" + __line);
                        sails.log.error(error);

                        req.session.notice = "The page cannot be created.";
                        res.redirect("/help");
                    } else if (!pageFound) {
                        savePage();
                    } else {
                        req.session.notice = "The page already exists.";
                        res.redirect("/help/"+req.params.page);
                        return;
                    }
                });

        } else {
            savePage();
        }

        function savePage()  {
            res.locals.errors = req.session.errors;
            res.locals.formData = req.session.formData || {};
            delete req.session.errors;
            delete req.session.formData;
            HelpCategories
                .find()
                .where()
                .exec(function(error, list) {
                    if (error) {
                        sails.log.error(__filename + ":" + __line + " [Failed to fetch Help List]");
                        sails.log.error(error);
                    }
                    else {
                        res.view("help/create", {
                            user: req.session.user,
                            pageTitle: "",
                            site: 'helpedit',
                            layout: 'layout-front',
                            categories: list,
                            pageName: req.params.page ? req.params.page : ""
                        });
                    }
                });

        }


    },

    postPages: function (req, res) {

        var errors, pageName;

        // pageName (from url) is more important
        pageName = (NamerService.unhelpfy(req.body.pageName) || req.body.pageTitle);

        async.parallel(
            {
                // Fetch single user data
                page: function(callback) {
                    DataService.getHelpPage(pageName, callback);
                }
            },

            function (error, data) {
                if (error) {
                    if (error.message == "Page not found"){
                        if(!req.body.pageTitle) {
                            errors += 'The page title cannot be empty'
                        }
                        if(!req.body.content) {
                            errors += 'The page content cannot be empty'
                        }
                        if(!req.body.categories) {
                            errors += 'The category cannot be empty'
                        }
                        if (errors) {
                            req.session.errors = errors;
                            // If the req.body is too big, the cookie session-store will crash,
                            // logging out the user. For this reason we use the sessionStorage
                            // on the client to save the body when submitting
                            //    req.session.formData = req.body;
                            req.session.formData = {
                                pageTitle: req.body.pageTitle
                            };
                            sails.log.error("There were a few errors when trying to create the page: " + errors);
                            res.redirect("/help/pages/new/" + pageName + "?e=1");
                            return;
                        }
                        var pagerecord = {};
                        sanitizer.sanitize('req.body.pageTitle');
                        sanitizer.sanitize('req.body.content');
                        if(req.user) {
                            pagerecord.createdUserId = req.user.id;
                            pagerecord.updatedUserId = req.user.id;
                        }
                        else {
                            pagerecord.createdUserId = 0;
                            pagerecord.updatedUserId = 0;
                        }
                        pagerecord.status = "pending";
                        pagerecord.title = req.body.pageTitle;
                        pagerecord.content = req.body.content;
                        if (req.body.message) {
                            pagerecord.lastCommitMessage = req.body.message;
                        }
                        pagerecord.name = pageName;

                        HelpCategories.findOne()
                            .where({name: req.body.categories})
                            .exec(function (err, cat){
                                if (err) {
                                    sails.log.error(__filename + ":" + __line + " [Failed to fetch Help List]");
                                    sails.log.error(err);
                                }
                                else if(!cat) {
                                    HelpCategories.create({
                                        name: req.body.categories,
                                        hidden: 1
                                    }).exec(function(err, cat) {
                                        saveCategory(cat);
                                    });
                                }
                                else {
                                    saveCategory(cat);
                                }
                            });


                    } else {
                        sails.log.error("Cannot create page: ");
                        sails.log.error(error);
                        res.redirect("/help/pages/new/" + pageName + "?e=1");
                        return;
                    }

                } else {
                        req.session.errors = [{msg: req.__('help-page-found')}];
                        res.redirect("/help/pages/new/"+pageName);
                        return;

                }
                function saveCategory(cat) {
                    pagerecord.categories = req.body.categories;
                    cat.list.add(pagerecord);
                    cat.save().then(function() {
                        req.session.notice = 'The page has been created. <a href="/help/' + pageName +'/edit">Edit it again?</a>';
                        res.redirect('/help/'+pageName);
                    }).catch(function (err) {
                        sails.log.error("There was an error with adding a Help Page" + err);
                        res.locals.title = "500 - Internal server error";
                        res.statusCode = 500;
                        console.log(err);
                        res.view('500', {
                            message: "Sorry, something went wrong and I cannot recover. If you think this might be a bug in Jingo, please file a detailed report about what you were doing here: https://github.com/claudioc/jingo/issues . Thank you!",
                            error: err
                        });
                    });
                }
            });
    },

    putPages: function (req, res) {

        var page, errors;

        async.parallel(
            {
                // Fetch single user data
                page: function(callback) {
                    DataService.getHelpPage(req.params.page, callback);
                }
            },

            function (error, data) {

                if (error) {
                        req.session.notice = "The page does not exist anymore.";
                        res.redirect("/help");
                        return;
                } else {
                    if(!req.body.pageTitle) {
                        errors += 'The page title cannot be empty'
                    }
                    if(!req.body.content) {
                        errors += 'The page content cannot be empty'
                    }
                    if (errors) {

                        fixErrors();
                        return;
                    }
                    sanitizer.sanitize("data.page.pageTitle");
                    sanitizer.sanitize("data.page.content");
                    sanitizer.sanitize("data.page.message");

                    if(req.user) {
                        data.page.updatedUserId = req.user.id;

                        if (data.page.createdUserId == null){
                            data.page.createdUserId = req.user.id;
                        }
                    } else {
                        data.page.updatedUserId = 0;
                        data.page.createdUserId = 0;
                    }
                    // Test if the user changed the name of the page and try to rename the file
                    // If the title is from filename, we cannot overwrite an existing filename
                    // If the title is from content, we never rename a file and the problem does not exist
                    if (data.page.name.toLowerCase() != req.body.pageName.toLowerCase()) {
                        data.page.findOne({name:data.page.name})
                            .exec(function(error, pageFound) {
                                if (error) {
                                    errors = [{
                                        param: "pageTitle",
                                        msg: __('help-page-found'),
                                        value: ""
                                    }];
                                    fixErrors()
                                } else if (!pageFound) {
                                    savePage();
                                } else {
                                    sails.log.error("Page is already found");
                                    req.session.notice = __('help-page-found');
                                    res.redirect("/help/pages/" + data.page.pageName + "/edit?e=1");
                                }
                        });

                    }
                    else {
                        savePage();
                    }

                    function savePage()  {
                        data.page.title = req.body.pageTitle;
                        data.page.name = req.body.pageName;
                        data.page.content = req.body.content;
                        if (req.body.message) {
                            pagerecord.lastCommitMessage = req.body.message;
                        }
                        data.page.save().then(function() {

                            LockerService.unlock(data.page);

                            if (data.page.name == "_footer") {
                                components.expire("footer");
                            }

                            if (data.page.name == '_sidebar') {
                                components.expire('sidebar');
                            }

                            req.session.notice = 'The page has been updated. <a href="/help/'+data.page.name+'/edit">Edit it again?</a>';
                            res.redirect("/help/"+data.page.name);

                        }).catch(function (err) {
                            res.locals.title = "500 - Internal server error";
                            res.statusCode = 500;
                            console.log(err);
                            res.view('500', {
                                message: "Sorry, something went wrong and I cannot recover. If you think this might be a bug in Jingo, please file a detailed report about what you were doing here: https://github.com/claudioc/jingo/issues . Thank you!",
                                error: err
                            });
                        });
                    }

                    function fixErrors() {
                        req.session.errors = errors;
                        // If the req.body is too big, the cookie session-store will crash,
                        // logging out the user. For this reason we use the sessionStorage
                        // on the client to save the body when submitting
                        //    req.session.formData = req.body;
                        req.session.formData = {
                            pageName: req.body.pageName,
                            pageTitle: req.body.pageTitle,
                            message: req.body.message
                        };
                        res.redirect("/help/pages/" + req.body.pageName + "/edit?e=1");

                    }
                }
            });
    },

    getPagesEdit: function (req, res) {

        var warning;
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

                        res.redirect("/help/pages/new/"+req.params.page);
                    } else {

                        res.redirect("/help/"); // NEEDS TO BE CHANGED
                    }

                } else {

                    if (data.page.lock !== req.user ) {
                        warning = "Warning: this page is probably being edited by " + data.page.lock;
                    }

                    if (!req.session.formData) {

                        res.locals.formData = {
                            pageName: data.page.name,
                            pageTitle: data.page.title,
                            content: data.page.content
                        };
                    } else {

                        res.locals.formData = req.session.formData;
                        // FIXME remove this when the sessionStorage fallback will be implemented
                        if (!res.locals.formData.content) {
                            res.locals.formData.content = data.page.content;
                        }
                    }

                    res.locals.errors = req.session.errors;

                    delete req.session.errors;
                    delete req.session.formData;
                    HelpCategories
                        .find()
                        .where()
                        .exec(function(error, list) {
                            if (error) {
                                sails.log.error(__filename + ":" + __line + " [Failed to fetch Help List]");
                                sails.log.error(error);
                            }
                            else {
                                res.view('help/edit', {
                                    page: data.page,
                                    site: 'helpedit',
                                    warning: warning,
                                    layout: 'layout-front',
                                    categories: list
                                });
                            }
                        });



                }
            });
    }
};