function lookup(uri,opts){"object"==typeof uri&&(opts=uri,uri=void 0),opts=opts||{};var io,parsed=url(uri),source=parsed.source,id=parsed.id;return opts.forceNew||opts["force new connection"]||!1===opts.multiplex?(debug("ignoring socket cache for %s",source),io=Manager(source,opts)):(cache[id]||(debug("new io instance for %s",source),cache[id]=Manager(source,opts)),io=cache[id]),io.socket(parsed.path)}var url=require("./url"),parser=require("socket.io-parser"),Manager=require("./manager"),debug=require("debug")("socket.io-client");module.exports=exports=lookup;var cache=exports.managers={};exports.protocol=parser.protocol,exports.connect=lookup,exports.Manager=require("./manager"),exports.Socket=require("./socket");