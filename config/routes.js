/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
      controller: 'home',
      action:     'index'
  },
    '/tour': {
        controller: 'home',
        action:     'tour'
    },
  '/plans': {
        controller: 'home',
        action:     'plans'
    },
  '/logout': {
    controller: 'auth',
    action:     'logout'
  },
  'get /login': {
    controller: 'auth',
    action:     'login'
  },
   'post /login': {
    controller: 'auth',
    action:     'authenticate'
   },
    'get /register': {
        controller: 'home',
        action:     'getregister'
    },
    'post /register': {
        controller: 'home',
        action:     'postregister'
    },
    '/panel': 'panel/panel.index',

    /* WIKI */
    'get /help/misc/syntax-reference': { controller:'help/misc', action: 'getSyntaxReference' },
    'post /help/misc/preview': { controller:'help/misc', action: 'postPreview' },
    'get /help/misc/existence': { controller:'help/misc', action: 'getExistence' },

    'put /help/pages': { controller:'help/pages', action: 'postPages' }, // Change this to POST
    'get /help/pages/new/:page': { controller:'help/pages', action: 'getPagesNew' },
    'get /help/pages/new': { controller:'help/pages', action: 'getPagesNew' },
    'get /help/pages/:page/edit': { controller:'help/pages', action: 'getPagesEdit' },
    'put /help/pages/:page': { controller:'help/pages', action: 'putPages' },
    'delete /help/pages/:page': { controller:'help/pages', action: 'deletePages' },

    'get /help/search': { controller:'help/search', action: 'getSearch' },
    'get /help/s': { controller: 'help/search', action: 'getS'},
    'get /help': { controller:'help/help', action: 'getHelp' },
    'get /help/faq': { controller:'help/help', action: 'getFaq' },
    'get /help/wiki': { controller:'help/help', action: 'getWiki' },
    'get /help/:page': { controller:'help/help', action: 'getHelpPage' },
    'get /help/:page/history': { controller:'help/help', action: 'getHistory' },
    'get /help/:page/:version': { controller:'help/help', action: 'getHelpPage' },
    'get /help/:page/compare/:revisions': { controller:'help/help', action: 'getCompare' },







  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
