/**
 * @license RequireJS text 2.0.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define(["module"],function(module){"use strict";var text,fs,progIds=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],xmlRegExp=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,bodyRegExp=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,hasLocation="undefined"!=typeof location&&location.href,defaultProtocol=hasLocation&&location.protocol&&location.protocol.replace(/\:/,""),defaultHostName=hasLocation&&location.hostname,defaultPort=hasLocation&&(location.port||void 0),buildMap=[],masterConfig=module.config&&module.config()||{};return text={version:"2.0.5",strip:function(content){if(content){content=content.replace(xmlRegExp,"");var matches=content.match(bodyRegExp);matches&&(content=matches[1])}else content="";return content},jsEscape:function(content){return content.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:masterConfig.createXhr||function(){var xhr,i,progId;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(i=0;3>i;i+=1){progId=progIds[i];try{xhr=new ActiveXObject(progId)}catch(e){}if(xhr){progIds=[progId];break}}return xhr},parseName:function(name){var modName,ext,temp,strip=!1,index=name.indexOf("."),isRelative=0===name.indexOf("./")||0===name.indexOf("../");return-1!==index&&(!isRelative||index>1)?(modName=name.substring(0,index),ext=name.substring(index+1,name.length)):modName=name,temp=ext||modName,index=temp.indexOf("!"),-1!==index&&(strip="strip"===temp.substring(index+1),temp=temp.substring(0,index),ext?ext=temp:modName=temp),{moduleName:modName,ext:ext,strip:strip}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(url,protocol,hostname,port){var uProtocol,uHostName,uPort,match=text.xdRegExp.exec(url);return match?(uProtocol=match[2],uHostName=match[3],uHostName=uHostName.split(":"),uPort=uHostName[1],uHostName=uHostName[0],!(uProtocol&&uProtocol!==protocol||uHostName&&uHostName.toLowerCase()!==hostname.toLowerCase()||(uPort||uHostName)&&uPort!==port)):!0},finishLoad:function(name,strip,content,onLoad){content=strip?text.strip(content):content,masterConfig.isBuild&&(buildMap[name]=content),onLoad(content)},load:function(name,req,onLoad,config){if(config.isBuild&&!config.inlineText)return void onLoad();masterConfig.isBuild=config.isBuild;var parsed=text.parseName(name),nonStripName=parsed.moduleName+(parsed.ext?"."+parsed.ext:""),url=req.toUrl(nonStripName),useXhr=masterConfig.useXhr||text.useXhr;!hasLocation||useXhr(url,defaultProtocol,defaultHostName,defaultPort)?text.get(url,function(content){text.finishLoad(name,parsed.strip,content,onLoad)},function(err){onLoad.error&&onLoad.error(err)}):req([nonStripName],function(content){text.finishLoad(parsed.moduleName+"."+parsed.ext,parsed.strip,content,onLoad)})},write:function(pluginName,moduleName,write){if(buildMap.hasOwnProperty(moduleName)){var content=text.jsEscape(buildMap[moduleName]);write.asModule(pluginName+"!"+moduleName,"define(function () { return '"+content+"';});\n")}},writeFile:function(pluginName,moduleName,req,write,config){var parsed=text.parseName(moduleName),extPart=parsed.ext?"."+parsed.ext:"",nonStripName=parsed.moduleName+extPart,fileName=req.toUrl(parsed.moduleName+extPart)+".js";text.load(nonStripName,req,function(){var textWrite=function(contents){return write(fileName,contents)};textWrite.asModule=function(moduleName,contents){return write.asModule(moduleName,fileName,contents)},text.write(pluginName,nonStripName,textWrite,config)},config)}},"node"===masterConfig.env||!masterConfig.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(fs=require.nodeRequire("fs"),text.get=function(url,callback){var file=fs.readFileSync(url,"utf8");0===file.indexOf("﻿")&&(file=file.substring(1)),callback(file)}):"xhr"===masterConfig.env||!masterConfig.env&&text.createXhr()?text.get=function(url,callback,errback,headers){var header,xhr=text.createXhr();if(xhr.open("GET",url,!0),headers)for(header in headers)headers.hasOwnProperty(header)&&xhr.setRequestHeader(header.toLowerCase(),headers[header]);masterConfig.onXhr&&masterConfig.onXhr(xhr,url),xhr.onreadystatechange=function(){var status,err;4===xhr.readyState&&(status=xhr.status,status>399&&600>status?(err=new Error(url+" HTTP status: "+status),err.xhr=xhr,errback(err)):callback(xhr.responseText))},xhr.send(null)}:("rhino"===masterConfig.env||!masterConfig.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java)&&(text.get=function(url,callback){var stringBuffer,line,encoding="utf-8",file=new java.io.File(url),lineSeparator=java.lang.System.getProperty("line.separator"),input=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file),encoding)),content="";try{for(stringBuffer=new java.lang.StringBuffer,line=input.readLine(),line&&line.length()&&65279===line.charAt(0)&&(line=line.substring(1)),stringBuffer.append(line);null!==(line=input.readLine());)stringBuffer.append(lineSeparator),stringBuffer.append(line);content=String(stringBuffer.toString())}finally{input.close()}callback(content)}),text});