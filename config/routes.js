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
    'get /wiki/misc/syntax-reference': { controller:'wiki/misc', action: 'getSyntaxReference' },
    'post /wiki/misc/preview': { controller:'wiki/misc', action: 'postPreview' },
    'get /wiki/misc/existence': { controller:'wiki/misc', action: 'getExistence' },

    'put /wiki/pages': { controller:'wiki/pages', action: 'postPages' }, // Change this to POST
    'get /wiki/pages/new/:page': { controller:'wiki/pages', action: 'getPagesNew' },
    'get /wiki/pages/new': { controller:'wiki/pages', action: 'getPagesNew' },
    'get /wiki/pages/:page/edit': { controller:'wiki/pages', action: 'getPagesEdit' },
    'put /wiki/pages/:page': { controller:'wiki/pages', action: 'putPages' },
    'delete /wiki/pages/:page': { controller:'wiki/pages', action: 'deletePages' },

    'get /wiki/search': { controller:'wiki/search', action: 'getSearch' },
    'get /wiki': { controller:'wiki/wiki', action: 'getWiki' },
    'get /wiki/:page': { controller:'wiki/wiki', action: 'getWikiPage' },
    'get /wiki/:page/history': { controller:'wiki/wiki', action: 'getHistory' },
    'get /wiki/:page/:version': { controller:'wiki/wiki', action: 'getWikiPage' },
    'get /wiki/:page/compare/:revisions': { controller:'wiki/wiki', action: 'getCompare' },







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
