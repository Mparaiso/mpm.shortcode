/*global describe,it,beforeEach*/
"use strict";
var assert=require('assert');
var shortcode=require('../shortcode');
var strings = {
	i:'[i class="o\'brian is a smart guy"]content[/i]',
	p:"[p/]",
	div:"[div class='content' id='#content']some content[/div]"
};
var aContext ={
	toUpper:"".toUpperCase
};
var div =function(attributes,content,context){
	assert.equal(attributes.class,'content');
	assert.equal(attributes.id,"#content");
	assert.equal(content,'some content');
	assert.equal(context,aContext);
	return "<div>"+content+"<div>";
};
var i =function(attrs,content,context){
	var attrs="";
	assert.equal(content,'content');
	assert.equal(attrs.class,"o\'brian is a smart\"guy");
	if(attrs.class){
		attrs += " class='"+attrs.class+"' ";
	}
	return "<i "+attrs+" >"+context.toUpper.call(content)+"</i>";
};
describe('shortcode.ShortCode',function(){
	beforeEach(function(){
		this.shortCode= new shortcode.ShortCode(aContext);
		this.shortCode.add('div',div);
		this.shortCode.add('i',i);
		this.shortCode.setDebug(true);
	});
	it('should parse div properly',function(){
		this.shortCode.parse(strings.div);
	});
	it('should parse i properly',function(){
		this.shortCode.parse(strings.i);
	});
	it('should render i properly',function(done){
		var res=this.shortCode.parse(strings.i);
		console.log(res);
		done();
	});
});