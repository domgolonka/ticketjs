/** @license
 * Plugin to load JS files that have dependencies but aren't wrapped into
 * `define` calls.
 * Author: Miller Medeiros
 * Version: 0.1.0 (2011/12/13)
 * Released under the MIT license
 */

define([],function(){var rParts=/^(.*)\[([^\]]*)\]$/;return{load:function(name,req,onLoad){var parts=rParts.exec(name);req(parts[2].split(","),function(){req([parts[1]],function(mod){onLoad(mod)})})}}});