var Iconv = require("iconv").Iconv;

var iconv = new Iconv("UTF-8", "ASCII//TRANSLIT//IGNORE");
var wsReplacement = "-";
var overrides = {};

function getWhitespaceReplacement() {
    // For future improvements
    return "-";
}


exports.helpfy = function (str) {

    var ret = str;

    if (typeof ret != "string" || ret.trim() === "") {
        return "";
    }

    wsReplacement = getWhitespaceReplacement();

    async.parallel(
        {
            asciiOnly: function(callback) {
                DataService.getConfig('helpasciiOnly', callback);
            },
            lowercase: function(callback) {
                DataService.getConfig('helplowercase', callback);
            }
        },


        function(error, data) {
            if (error) {
                ResponseService.makeError(error, req, res);
            } else {
                // Replace < and > with '' (Gollum replaces it with '-')
                ret = ret.replace(/[<>]/g, '');
                // Replace / with '-' (Gollum replaces it with '')
                ret = ret.replace(/\//g, '-');

                if (data.asciiOnly) {
                    ret = iconv.convert(ret)
                        .toString()
                        .replace(/[^a-zA-Z0-9\- _]/g, "");
                }

                ret = ret.trim();

                if (data.lowercase) {
                    ret = ret.toLowerCase();
                }

                ret = ret.replace(/\s/g, wsReplacement);

                return ret;
            }
        });


};

// Not symmetric by any chance, but still better than nothing
exports.unhelpfy = function (str) {

    var ret = str;

    if (typeof ret != "string" || ret.trim() === "") {
        return "";
    }

    async.parallel(
        {
            lowercase: function(callback) {
                DataService.getConfig('helplowercase', callback);
            }
        },


        function(error, data) {
            if (error) {
                ResponseService.makeError(error, req, res);
            } else {
                wsReplacement = getWhitespaceReplacement();

                ret = ret.replace(new RegExp(wsReplacement, "g"), " ");

                if (data.lowercase) {
                    // "something really hot" => "Something Really Hot"
                    ret = ret.split(/\b/).map(function (v) {
                        return v.slice(0,1).toUpperCase() + v.slice(1);
                    }).join("");
                }

                return ret;
            }
        });


};
