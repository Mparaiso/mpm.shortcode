mpm.shortcode 
=============

[![Build Status](https://travis-ci.org/Mparaiso/mpm.shortcode.png?branch=master)](https://travis-ci.org/Mparaiso/mpm.shortcode)

[![NPM](https://nodei.co/npm/mpm.shortcode.png?downloads=true)](https://nodei.co/npm/mpm.shortcode/)


author mparaiso <mparaiso@online.fr>

license LGPL

nano templating for nodejs and the browser. 

__ShortCode__ allows javascript developpers to use a nano templating engine in their application.

In a cms for instance , a content field can support shortcodes and allow users to write complex content
without knowing HTML ( integrate a video player in a page for instance), and without the app allowing 
the user to directly write HTML tags.

####INSTALLATION
npm install mpm.shorcode

####USAGE

	var shortcode = require('mpm.shortcode');
	// you can pass a context to the shortcode, 
	// which will be avaiable to each shortcode.
	context = { name:'foo'};
	var myShortCodes =  shortcode.create(context);
	// let's define our first shortcode , that yields a video tag
	var myShortCodes.add('video',function(attributes,content,context){
		return "<video src='"+attributes.src+"' >"+content+"</video>";
	});
	//debug mode
	myShortCodes.setDebug(true);
	//a string will get evaluated
	var string = "[video src='video.mp4']No video Support[/video]"
	var result = myShortCodes.parse(string);
	console.log(result)
	/**
	 * will yield : 
	 * <video src='video.mp4'>No video Support</video>
	 */
	
Shortcodes can have closing tags or not :

- [foo bar="baz"/]
- [bar foo="fizz"]
- [baz fizz="foo"] content [/baz]

are valid shortcodes.

	
####LIMITATIONS

- shortcodes cannot be nested ( FOR NOW )
