/*** Generated by streamline 0.1.36-stack - DO NOT EDIT ***/ "use strict"; var __global = typeof global !== 'undefined' ? global : window;var __srcName='./test/server/streams-test_.js'; function __cb(_, frame, offset, col, fn){ var ctx = __global.__context; frame.offset = offset; frame.col = col; return function ___(err, result){ __global.__frame = frame; __global.__context = ctx; if (err) { err.__frame = err.__frame || frame; return _(err); } try { return fn(null, result); } catch (ex) { ex.__frame = ex.__frame || frame; return __propagate(_, ex); } } } function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); } function __nt(_, frame, fn){ var i = 0; var cb = __cb(_, frame, 0, 0, fn); var safeCb = function ___(){ try { cb(); } catch (ex) { __propagate(cb, ex); } }; if (typeof process != "undefined" && typeof process.nextTick == "function") return function ___(){ if (++i % 20 == 0) process.nextTick(safeCb); else cb(); }; else return function ___(){ if (++i % 20 == 0) setTimeout(safeCb); else cb(); }; } function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } } function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } } var streams = require("streamline/lib/streams/streams");


var module = QUnit.module;

var bufSize = 100;
var bufCount = 3;
var totalSize = (bufCount * bufSize);
var modulo = 17;

function makeBuffer(i) {
 var buf = new Buffer(bufSize);
 for (var j = 0; (j < bufSize); j++) { buf[j] = ((48 + i) + ((j % modulo)));; };


 return buf;};


function checkBuffer(buf, start) {
 ok((buf != null), "buffer not null");
 var i = Math.floor((start / bufSize));
 var j = (start % bufSize);
 for (var k = 0; (k < buf.length); k++, j++) {
 if ((j == bufSize)) {
 i++;
 j = 0; } ;

 if ((buf[k] !== ((48 + i) + ((j % modulo))))) {
 return ok(false, ((((((("buffer verification failed:  i=" + i) + ", j=") + j) + " k=") + k) + " val=") + buf[k])) }; };

 ok(true, "buffer content is valid");
 return (start + buf.length);};


new streams.HttpServer(function __1(req, res, _) { if (!_) { return __future(__1, arguments, 2); }; var __frame = __global.__frame = { file: __srcName, line: 35, name: "__1", prev: __global.__frame }; try { var i;
 res.writeHead(200, { "Content-Type": "application/octet-stream" });
 res.emitter.on("drain", function() {
 process.stderr.write("*"); });

 i = 0; var __2 = false; return (function ___(__break) { var __loop = __nt(_, __frame, function __$__1() { if (__2) { i++; } else { __2 = true; } ; var __1 = (i < bufCount); if (__1) {
 return res.write(__cb(_, __frame, 6, 1, function __$__1() {
 return process.nextTick(__cb(_, __frame, 7, 1, __loop)); }), makeBuffer(i)); } else { __break(); } ; }); __loop(); })(function __$__1() {

 res.end(); _(); }); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };
}).listen(null, 1337, "127.0.0.1");


var paused = 0, resumed = 0;
var doStop = false;

module("node streams test", {
 setup: function() {  },

 teardown: function() {
 if (doStop) {

 setTimeout(function() {
 process.kill(process.pid);
 }, 0); } ; }});




function addBufferHooks(stream) {
 var pause = stream.pause.bind(stream);
 stream.pause = function() {

 paused++;
 pause(); };

 var resume = stream.resume.bind(stream);
 stream.resume = function() {

 resumed++;
 resume(); };};



function doTest(_, name, options, fn) { if (!_) { return __future(doTest, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, line: 79, name: "doTest", prev: __global.__frame }; try { var resp, last;

 options.url = "http://127.0.0.1:1337/";
 return streams.httpRequest(options).end().response(__cb(_, __frame, 3, 1, function ___(__0, __1) { resp = __1;
 addBufferHooks(resp.emitter);
 return fn(__cb(_, __frame, 5, 1, function __$doTest() {
 return resp.read(__cb(_, __frame, 6, 1, function ___(__0, __2) { last = __2;
 strictEqual(last, null, "read return null at end"); _(); })); }), resp); })); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};



function dot(_) { if (!_) { return __future(dot, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, line: 90, name: "dot", prev: __global.__frame }; try {
 return process.nextTick(__cb(_, __frame, 1, 1, _)); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};




function testPass(name, options) {

 var t0 = Date.now();

 function testRead(name, detail, size) {
 asyncTest(((name + " / ") + detail), function __1(_) { if (!_) { return __future(__1, arguments, 0); } ; var __frame = __global.__frame = { file: __srcName, line: 101, name: "__1", prev: __global.__frame }; try {
 return doTest(__cb(_, __frame, 1, 1, function __$__1() {







 start(); _(); }), name, options, function __1(_, resp) { if (!_) { return __future(__1, arguments, 0); } ; var __frame = __global.__frame = { file: __srcName, line: 102, name: "__1", prev: __global.__frame }; try { var i, total, len, buf; i = 0; total = 0; var __3 = false; return (function ___(__break) { var __loop = __nt(_, __frame, function __$__1() { if (__3) { i++; } else { __3 = true; } ; var __2 = (total < totalSize); if (__2) { len = ((size && (typeof size === "function")) ? size() : size); return resp.read(__cb(_, __frame, 3, 1, function ___(__0, __1) { buf = __1; total = checkBuffer(buf, total); __loop(); }), len); } else { __break(); } ; }); __loop(); })(_); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); }; }); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); }; }); };



 testRead(name, "chunk read");
 testRead(name, "half size read", Math.floor((bufSize / 2)));
 testRead(name, "double size read", (bufSize * 2));
 testRead(name, "odd size read", Math.floor(((4 * bufSize) / 7)));
 (false && testRead(name, "random size read", function() {
 var r = Math.random();
 return Math.floor((((((r * r) * r) * r) * 3) * bufSize)); }));};




var oneTenth = Math.floor(((bufCount * bufSize) / 10));

testPass("default buffering", {});
testPass("buffer 0/1 tenth", { lowMark: 0, highMark: oneTenth});
testPass("buffer 2/3 tenth", { lowMark: (2 * oneTenth), highMark: (3 * oneTenth)});
testPass("buffer 1 tenth and above", { lowMark: oneTenth, highMark: (11 * oneTenth)});
testPass("buffer all", { lowMark: 0, highMark: (11 * oneTenth)});

asyncTest("stop  tests", 0, function __2(_) { if (!_) { return __future(__2, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, line: 133, name: "__2", prev: __global.__frame }; try {
 doStop = true;
 start(); _(); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };});