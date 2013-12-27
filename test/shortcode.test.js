/*global describe,it,beforeEach*/
"use strict";
var assert=require('assert');
var shortcode=require('../shortcode');
var strings = {
	i:"[i]content[i]",
	p:"[p/]",
	div:"[div class='content' id='#content']some content[/div]"
};
var aContext ={};
var div =function(attributes,content,context){
	assert.equal(attributes.class,'content');
	assert.equal(attributes.id,"#content");
	assert.equal(content,'some content');
	assert.equal(context,aContext);
	return "<div>"+content+"<div>";
};
describe('shortcode.ShortCode',function(){
	beforeEach(function(){
		this.shortCode= new shortcode.ShortCode(aContext);
		this.shortCode.add('div',div);
	});
	it('should parse div properly',function(){
		this.shortCode.parse(strings.div);
	});
});