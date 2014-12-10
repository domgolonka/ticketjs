/**
 * Basic parser for URL properties
 * @author Miller Medeiros
 * @version 0.1.0 (2011/12/06)
 * MIT license
 */

define([],function(){function parseProperties(str){for(var match,obj={};match=rProps.exec(str);)obj[match[1]]=typecastVal(match[2]||match[3]);return obj}function typecastVal(val){return rArr.test(val)?val=val.replace(rArr,"$1").split(","):"null"===val?val=null:"false"===val?val=!1:"true"===val?val=!0:""===val||"''"===val||'""'===val?val="":isNaN(val)||(val=+val),val}var rProps=/([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g,rArr=/^\[([^\]]+)\]$/;return{parseProperties:parseProperties,typecastVal:typecastVal}});