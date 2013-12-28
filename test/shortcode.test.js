/*global describe,it,beforeEach*/
"use strict";
var assert = require('assert');
var expect = require('chai').expect;
var shortcode = require('../shortcode');
var strings = {
    i: '[i class="o\'brian is a smart\"guy"]content[/i]',
    p: "[p/]",
    div: "[div class='content' id='#content']some content[/div]"
};
var aContext = {
    toUpper: "".toUpperCase
};
var div = function (attributes, content, context) {
    assert.equal(attributes.class, 'content');
    assert.equal(attributes.id, "#content");
    assert.equal(content, 'some content');
    assert.equal(context, aContext);
    return "<div>" + content + "<div>";
};
var i = function (attributes, content, context) {
    var attrs = "";
    assert.equal(content, 'content');
    assert.equal(attributes.class, "o\'brian is a smart\"guy");
    attrs += " class='" + attributes.class + "' ";
    return "<i " + attrs + " >" + context.toUpper.call(content) + "</i>";
};
var P_RESULT = "<p>a paragraph</p>";
var p = function (attributes, content, context) {
    return P_RESULT;
}
describe('shortcode.ShortCode', function () {
    beforeEach(function () {
        this.shortCode = new shortcode.ShortCode(aContext);
        this.shortCode.add('div', div);
        this.shortCode.add('i', i);
        this.shortCode.add('p', p);
        this.shortCode.setDebug(true);
    });
    it('should parse div properly', function () {
        this.shortCode.parse(strings.div);
    });
    it('should parse i properly', function () {
        this.shortCode.parse(strings.i);
    });
    it('should render i properly', function (done) {
        var res = this.shortCode.parse(strings.i);
        assert.equal(res, "<i  class='o\'brian is a smart\"guy'  >CONTENT</i>");
        done();
    });
    it('should parse properly a combinaison of shortcodes', function () {
        var res = this.shortCode.parse(strings.i + strings.div + strings.p);
        expect(res).to.include(P_RESULT);
        expect(res).to.match(/\<\i.*?\>/);
        expect(res).to.match(/\<div.*?\>/);
    });
});