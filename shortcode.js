/*jslint regexp:true,browser:true*/
/**
 *    mpm.shortcode
 *    @copyright 2011 mparaiso <mparaiso@online.fr>
 *    @license LGPL
 *  @TODO support selfclosing shortcodes
 *  @TODO support recursive parsing
 */
(function (shortcode) {
    "use strict";
    shortcode.ShortCode = function (context) {
        this._context = context || {};
        this._tags = {};
        this._debug = false;
    };
    shortcode.ShortCode.prototype.setDebug = function(isDebug){this._debug=isDebug;};
    shortcode.ShortCode.prototype.getDebug = function(isDebug){return this._debug;};
    //render a shortcode , if debug mode , render error on error
    shortcode.ShortCode.prototype.render = function(tag,attributes,content){
        var shortcode,result="";
        if(this.has(tag)){
            shortcode = this.getTag(tag);
            try{
                result=shortcode(attributes,content,this.getContext());
            }catch(e){
                if(this.getDebug()){
                    result=this.constructor.ERROR_MESSAGE+tag+" ."+ e.message;
                }
            }
        }
        return result;
    };
    //shortcode.ShortCode.prototype.constructor = shortcode.ShortCode;
    shortcode.ShortCode.prototype.getTags = function () {
        return this._tags;
    };
    //parse string
    shortcode.ShortCode.prototype.parse = function (text) {
        var i = 0, tagName, result = "", tokens = this.tokenize(text);
        while (i < tokens.length) {
            tagName = null;
            if (tokens[i].match(this.constructor.regexp)) {
                tagName = this.extractTagName(tokens[i]);
                if (tagName && this.has(tagName)) {
                    //try to see if there is a closing tag
                    if (this.matchClosingTag(tagName, tokens[i + 2])) {
                        result += this.render(tagName,this.extractAttributes(tokens[i]), tokens[i + 1]);
                        i += 3;
                    } else {
                        //no closing tag
                        result += this.render(tagName,this.extractAttributes(tokens[i]), "");
                        i += 1;
                    }
                } else {
                    result += tokens[i];
                    i += 1;
                }
            } else {
                result += tokens[i];
                i += 1;
            }
        }
        return result;
    };
    //split string according to grammar rules for parsing
    shortcode.ShortCode.prototype.tokenize = function (string) {
        return string.split(this.constructor.regexp);
    };
    //is tagname registered as short code
    shortcode.ShortCode.prototype.has = function (tag) {
        return this.getTags()[tag] instanceof Function;
    };
    //get shortcode by name
    shortcode.ShortCode.prototype.getTag = function (tagName) {
        return this.getTags()[tagName];
    };
    shortcode.ShortCode.prototype.getContext = function () {
        return this._context;
    };
    //add new shortcode
    shortcode.ShortCode.prototype.add = function (tag, callback) {
        this.getTags()[tag] = callback;
    };
    //extract tagName from string
    shortcode.ShortCode.prototype.extractTagName = function (string) {
        var matches = string.match(this.constructor.tag);
        if (matches !== null) {
            return matches[1];
        }
    };
    //tells if a tag has a matching closing string
    shortcode.ShortCode.prototype.matchClosingTag = function (tag, string) {
        var matches;
        if (!string) {
            return false;
        }
        matches = string.match(this.constructor.closingTag);
        if (matches !== null) {
            if (matches[1] === tag) {
                return true;
            }
        }
        return false;
    };
    //extract attributes from string
    shortcode.ShortCode.prototype.extractAttributes = function (string) {
        var attributes = {};
        var attributeStrings = string.match(this.constructor.attributes);
        //if has attributes
        if (attributeStrings) {
            attributeStrings.forEach(function (as) {
                var matches = as.match(this.constructor.attribute);
                if (matches) {
                    attributes[matches[1]] = matches[3];
                }
            }, this);
        }
        return attributes;
    };
    shortcode.ShortCode.regexp = /(\[.*?\])/g;
    shortcode.ShortCode.tag = /(?:\[)(\w+)(.*)(?:\])/;
    shortcode.ShortCode.closingTag = /(?:\[\/)(\w+)(.*)(?:\])/;
    shortcode.ShortCode.attributes = /(\w+\=(\"|\').+?(\"|\')(?:(\W+|\s+)))/g;
    shortcode.ShortCode.attribute = /^(\w+)\=(\"|\')(.*)(\"|\')/;
    shortcode.ShortCode.ERROR_MESSAGE='error for tag :';
    /**
     * Factory Method
     * @param  {Object} context 
     * @return {shortcode.ShortCode} a shortcode builder
     */
    shortcode.create = function(context){
        return new shortcode.ShortCode(context);
    };
    if (typeof module !== 'undefined') {
        module.exports = shortcode;
    }
}(this));






