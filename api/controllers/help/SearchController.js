var path = require("path"),
    us = require('underscore.string');
var async = require('async');
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
        getSearch: function(req, res) {
          res.locals.term = us.trim(req.query.term);
          async.auto({

              // First get the post
              categories: function (cb) {
                HelpCategories
                  .find().populate('help')
                  .populate('faq')
                  .exec(cb);
              },
              helphelper: ['categories', function (cb, results) {
                Help.find({content: {'like': '%' + res.locals.term + '%'}}).exec(cb);
              }],
              faqhelper: ['categories', function (cb, results) {
                Faq.find({question: {'like': '%' + res.locals.term + '%'}}).exec(cb);
              }]
            },

            function finish(err, results) {
              if (err) {
                return res.serverError(err);
              }
              sails.log.error(results.helphelper);
              res.view("help/search", {
                layout: 'layout-front',
                site: 'help',
                helpitems: results.helphelper,
                faqitems: results.faqhelper,
                title: "Search results"
              })
            });
        }
          /*var results = [];
          res.locals.term = us.trim(req.query.term);


          Help.find({content: {'like': '%' + res.locals.term + '%'}}).exec(function (error, items) {
            results.push(items);

          });
          Faq.find({content: {'like': '%' + res.locals.term + '%'}}).exec(function (error, items) {
            results.push(items);
          });
          sails.log.error(results[0]);
          res.view("help/search", {
            layout: 'layout-front',
            site: 'help',
            items: results,
            title: "Search results"
          })
        } */


};
/*
var async = require('async'),
  _ = require('lodash');

module.exports = {


  index: function (req, res) {

    async.auto({

        // Get the blog posts
        posts: function (cb) {
          Blog.find()
            .where({ isPublished: 1 })
            .limit(5)
            .sort('createdAt DESC')
            .exec(cb);
        },


        // Get some more stuff
        // (this will happen AT THE SAME TIME as `posts` above)
        otherThings: function (cb) {
          OtherThing.find()
            .limit(30)
            .exec(cb);
        },


        // Get comments
        // (we'll wait until `posts` is finished first)
        comments: ['posts', function (cb, async_data) {

          // Get `posts`
          // (the second argument to cb() back in `posts`)
          // Used map to make sure posts are an array of ids and not just an object.
          var posts = async_data.posts.map(function (item){ return item.id});

          // Get comments that whose `post_id` is equal to
          // the id of one of the posts we found earlier
          Comment.find()
            .where({ post_id: posts })
            .exec(cb);
        }]

      },
      function allDone (err, async_data) {

        // If an error is passed as the first argument to cb
        // in any of the functions above, then the async block
        // will break, and this function will be called.
        if (err) return res.serverError(err);

        var posts = async_data.posts;
        var comments = async_data.comments;

        var otherThings = async_data.otherThings;

        // Fold the comments into the appropriate post
        // An in-memory join
        _.map(posts, function (post) {
          var theseComments =
            _.where(comments, { post_id: post.id });
          post.comments = theseComments;

        });

        // Show a view using our data
        res.json({
          // layout: 'homeLayout',
          posts: posts,
          otherThings: otherThings
        });
      });

  }
};
*/
