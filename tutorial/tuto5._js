"use strict";
var streams = require('streamline/lib/streams/server/streams');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

var begPage = '<html><head><title>My Search</title></head></body>' + //
'<form action="/">Search: ' + //
'<input name="q" value="{q}"/>' + //
'<input type="submit"/>' + //
'</form><hr/>';
var endPage = '<hr/>generated in {ms}ms</body></html>';

streams.createHttpServer(function(request, response, _) {
	var query = qs.parse(url.parse(request.url).query),
		t0 = new Date();
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});
	response.write(_, begPage.replace('{q}', query.q || ''));
	response.write(_, search(_, query.q));
	response.end(endPage.replace('{ms}', new Date() - t0));
}).listen(_, 1337);
console.log('Server running at http://127.0.0.1:1337/');

function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	// pass it to Google
	try {
		return '<h2>Web</h2>' + googleSearch(_, q) + '<hr/><h2>Files</h2>' + fileSearch(_, q);
	} catch (ex) {
		return 'an error occured. Retry or contact the site admin: ' + ex.stack;
	}
}

function googleSearch(_, q) {
	var t0 = new Date();
	var json = streams.httpRequest({
		url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + q,
		proxy: process.env.http_proxy
	}).end().response(_).checkStatus(200).readAll(_);
	// parse JSON response
	var parsed = JSON.parse(json);
	// Google may refuse our request. Return the message then.
	if (!parsed.responseData) return "GOOGLE ERROR: " + parsed.responseDetails;
	// format result in HTML
	return '<ul>' + parsed.responseData.results.map(function(entry) {
		return '<li><a href="' + entry.url + '">' + entry.titleNoFormatting + '</a></li>';
	}).join('') + '</ul>' + '<br/>completed in ' + (new Date() - t0) + ' ms';
}

function fileSearch(_, q) {
	var t0 = new Date();
	var results = '';

	function doDir(_, dir) {
		fs.readdir(dir, _).forEach_(_, function(_, file) {
			var stat = fs.stat(dir + '/' + file, _);
			if (stat.isFile()) {
				fs.readFile(dir + '/' + file, 'utf8', _).split('\n').forEach(function(line, i) {
					if (line.indexOf(q) >= 0) results += '<br/>' + dir + '/' + file + ':' + i + ':' + line;
				});
			} else if (stat.isDirectory()) {
				doDir(_, dir + '/' + file);
			}
		});
	}
	doDir(_, __dirname);
	return results + '<br/>completed in ' + (new Date() - t0) + ' ms';;
}