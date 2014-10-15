var Marked = require("marked"),
    crypto = require("crypto"),
    Nsh    = require("node-syntaxhighlighter");


var mdRenderer = new Marked.Renderer();
mdRenderer.heading  = function (text, level) {
    var content;
    if (level == 1) {
        content = '<div class="grid-title no-border"><h' + level + '>' + text + '</h' + level + '></div>';
    }
    if (level >1) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        content = '<div class="grid-title no-border"> <h' + level + '><a name="' +
            escapedText +
            '"  href="#' +
            escapedText +
            '">' +
            text + '</a></h' + level + '></div>';
    }
    return content;
};

mdRenderer.code = function(code, lang, escaped) {
    if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out !== null && out !== code) {
            escaped = true;
            code = out;
        }
    }

    if (!lang) {
        return '<code class="md-code">' +
            (escaped ? code : escape(code, true)) +
            '\n</code>';
    }

    return '<code class="md-code '
        + this.options.langPrefix
        + escape(lang, true)
        + '">'
        + (escaped ? code : escape(code, true))
        + '\n</code>\n';
};

Marked.setOptions({
    gfm: true,
    renderer: mdRenderer,
    pedantic: false,
    tables: true,
    breaks: true,
    smartLists: true,
    sanitize: false, // To be able to add iframes
    highlight: function(code, lang) {
        lang = lang || "text";
        return Nsh.highlight(code, Nsh.getLanguage(lang) || Nsh.getLanguage('text'), {gutter: lang !== 'text'});
    }
});

var tagmap = {};

// Yields the content with the rendered [[bracket tags]]
// The rules are the same for Gollum https://github.com/github/gollum
function extractTags  (text) {

    tagmap = {};

    var matches = text.match(/(.?)\[\[(.+?)\]\]([^\[]?)/g),
        tag,
        id;

    if (matches) {
        matches.forEach(function(match) {
            match = match.trim();
            tag = /(.?)\[\[(.+?)\]\](.?)/.exec(match);
            if (tag[1] == "'") {
                return;
            }
            id = crypto.createHash('sha1').update(tag[2]).digest("hex");
            tagmap[id] = tag[2];
            text = text.replace(tag[0], id);
        });

    }
    return text;
};

function evalTags(text) {

    var parts,
        name,
        pageName,
        re;

    for (var k in tagmap) {
        parts = tagmap[k].split("|");
        name = pageName = parts[0];
        if (parts[1]) {
            pageName = parts[1];
        }
        pageName = encodeURIComponent(NamerService.wikify(pageName));

        tagmap[k] = "<a class=\"internal\" href=\"/wiki/" + pageName + "\">" + name + "</a>";
    }

    for (k in tagmap) {
        re = new RegExp(k, "g");
        text = text.replace(re, tagmap[k]);
    }

    return text;
};
var Renderer = {
    render: function(content) {

                var text = extractTags(content);
                text = evalTags(text);
                return Marked(text);

    },
    matchHeader: function(content) {
        var headers = {};
        var matches = content.match(/<h[1-6]>(.*?)<\/h[1-6]>/g);
        if (matches) {
            matches.forEach(function(match) {
                match = match.replace(/<\/?[^>]+(>|$)/g, '');
                match = match.trim();
                var escapedText = match.toLowerCase().replace(/[^\w]+/g, '-');
                headers = '<h4><a name="' +
                    escapedText +
                    '" class="anchor" href="#' +
                    escapedText +
                    '">' +
                    match + '</a></h4>';
            });
        }
        return headers;
    }
};

module.exports = Renderer;