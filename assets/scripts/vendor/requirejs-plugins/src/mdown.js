/** @license
 * RequireJS plugin for loading Markdown files and converting them into HTML.
 * Author: Miller Medeiros
 * Version: 0.1.1 (2012/02/17)
 * Released under the MIT license
 */

define(["text","markdownConverter"],function(text,markdownConverter){var buildMap={};return{load:function(name,req,onLoad,config){text.get(req.toUrl(name),function(data){data=markdownConverter.makeHtml(data),config.isBuild?(buildMap[name]=data,onLoad(data)):onLoad(data)})},write:function(pluginName,moduleName,write){if(moduleName in buildMap){var content=text.jsEscape(buildMap[moduleName]);write.asModule(pluginName+"!"+moduleName,"define(function () { return '"+content+"';});\n")}}}});