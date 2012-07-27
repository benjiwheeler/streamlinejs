/*** Generated by streamline 0.4.4 (generators) - DO NOT EDIT ***/var fstreamline__ = require("streamline/lib/generators/runtime"); (fstreamline__.create(function(_) {var failAsync_ = fstreamline__.create(failAsync, 0), failSync_ = fstreamline__.create(failSync, 0), A_ = fstreamline__.create(A, 0), B_ = fstreamline__.create(B, 0), C_ = fstreamline__.create(C, 0), D_ = fstreamline__.create(D, 0), E_ = fstreamline__.create(E, 0), F_ = fstreamline__.create(F, 0), G_ = fstreamline__.create(G, 0), H_ = fstreamline__.create(H, 0), I_ = fstreamline__.create(I, 0), T_ = fstreamline__.create(T, 0); // WARNING: DO NOT INSERT COMMENTS OR ANYTHING
// Line numbers matter to this test!

var module = QUnit.module;



function nextTick(cb){
	setTimeout(function(){
		cb();
	}, 0);
}

function failAsync(_, code){
	throw new Error(code);
}

function failSync(_, code){
	(function fail(dummy){ // dummy to defeat CoffeeScript compat rule
		throw new Error(code);
	})(0);
;yield;}

var fail;

function A(_, code){
	if (code == 1) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	if (code == 2) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	(yield fstreamline__.invoke(null, nextTick, [_], 0));
	if (code == 3) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	for (var i = 0; i < 6; i++) {
		if (code == i) 
			(yield fstreamline__.invoke(null, fail, [_, code], 0));
		(yield fstreamline__.invoke(null, nextTick, [_], 0));
	}
	if (code == 6) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	(yield fstreamline__.invoke(null, nextTick, [_], 0));
	(yield B(_, code));
	(yield fstreamline__.invoke(null, nextTick, [_], 0));
	yield ( "END");
}

function B(_, code){
	if (code == 7) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	(yield C(_, code));
	(yield fstreamline__.invoke(null, nextTick, [_], 0));
	(yield C(_, code));
	(yield D(_, code));
;yield;}

function C(_, code){
	if (code == 8) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
;yield;}

function D(_, code){
	if (code == 9) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
;yield;}

function E(_, code){
	try {
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	} 
	catch (ex) {
		if (code % 3 == 1) 
			(yield fstreamline__.invoke(null, fail, [_, code], 0));
		else if (code % 3 == 2) 
			(yield A(_, code));
		else 
			yield ( "OK " + code);
	}
;yield;}

function F(_, code){
	var f1 = A_(null, code);
	var f2 = A_(null, code + 1);
	yield ( (yield fstreamline__.invoke(null, f1, [_], 0)) + " & " + (yield fstreamline__.invoke(null, f2, [_], 0)));
}

function G(_, code){
	if (code == 5) 
		(yield fstreamline__.invoke(null, fail, [_, code], 0));
	yield ( "" + code);
}

function H(_, code){
	if (code % 2 == 0) 
		(yield fstreamline__.invoke(null, nextTick, [_], 0));
	yield ( (yield G(_, code)));
}

function I(_, code){
	var s = "";
	for (var i = 0; i < code; i++) 
		s += (yield H(_, i));
	yield ( s);
}

function T(_, fn, code, failFn){
	fail = failFn;
	var s = "{";
	try {
		yield ( (yield fstreamline__.invoke(null, fn, [_, code], 0)));
	} 
	catch (ex) {
		var s = ex.stack;
		s = s.split('\n').map(function(l){
			var m = /^\s+at (\w+).*:(\d+)\:[^:]+$/.exec(l);
			if (m) 
				return m[1] + ":" + m[2];
			return l;
		}).join('/');
		var end = s.indexOf('/T:');
		yield ( end < 0 ? s + "-- end frame missing" : s.substring(0, end));
	}
;yield;}

function stackEqual(got, expect) {
	if (typeof T_ === 'function' && T_.gstreamlineFunction) { got = got.substring(0, 25); expect = expect.substring(0, 25); }
	strictEqual(got, expect);
}
// safari hack
var rawStack = new Error().stack ? function(raw) {
	return raw;
} : function() {
	return "raw stack unavailable";
};

module("stacks");

asyncTest("stacks", 20, fstreamline__.create(function(_) {
	stackEqual((yield T(_, A_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/A:28");
	stackEqual((yield T(_, A_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/A:28");
	stackEqual((yield T(_, A_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30");
	stackEqual((yield T(_, A_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30");
	stackEqual((yield T(_, A_, 3, failAsync_)), rawStack("Error: 3/failAsync:15") + "/A:33");
	stackEqual((yield T(_, A_, 3, failSync_)), rawStack("Error: 3/fail:20/failSync:21") + "/A:33");
	stackEqual((yield T(_, A_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/A:36");
	stackEqual((yield T(_, A_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/A:36");
	stackEqual((yield T(_, A_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36");
	stackEqual((yield T(_, A_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36");
	stackEqual((yield T(_, A_, 6, failAsync_)), rawStack("Error: 6/failAsync:15") + "/A:40");
	stackEqual((yield T(_, A_, 6, failSync_)), rawStack("Error: 6/fail:20/failSync:21") + "/A:40");
	stackEqual((yield T(_, A_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/B:49/A:42");
	stackEqual((yield T(_, A_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42");
	stackEqual((yield T(_, A_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42");
	stackEqual((yield T(_, A_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42");
	stackEqual((yield T(_, A_, 9, failAsync_)), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42");
	stackEqual((yield T(_, A_, 9, failSync_)), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42");
	stackEqual((yield T(_, A_, 10, failAsync_)), "END");
	stackEqual((yield T(_, A_, 10, failSync_)), "END");
	start();
;yield;}, 0));

asyncTest("catch", 20, fstreamline__.create(function(_) {
	stackEqual((yield T(_, E_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30/E:74");
	stackEqual((yield T(_, E_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/E:74");
	stackEqual((yield T(_, E_, 3, failAsync_)), "OK 3");
	stackEqual((yield T(_, E_, 3, failSync_)), "OK 3");
	stackEqual((yield T(_, E_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36/E:74");
	stackEqual((yield T(_, E_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/E:74");
	stackEqual((yield T(_, E_, 6, failAsync_)), "OK 6");
	stackEqual((yield T(_, E_, 6, failSync_)), "OK 6");
	stackEqual((yield T(_, E_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/E:74");
	stackEqual((yield T(_, E_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/E:74");
	stackEqual((yield T(_, E_, 9, failAsync_)), "OK 9");
	stackEqual((yield T(_, E_, 9, failSync_)), "OK 9");
	stackEqual((yield T(_, E_, 10, failAsync_)), rawStack("Error: 10/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 10, failSync_)), rawStack("Error: 10/fail:20/failSync:21") + "/E:72");
	start();
;yield;}, 0));

asyncTest("futures", 20, fstreamline__.create(function(_) {
	stackEqual((yield T(_, F_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/A:28/F:83");
	stackEqual((yield T(_, F_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/A:28/F:83");
	stackEqual((yield T(_, F_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30/F:83");
	stackEqual((yield T(_, F_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/F:83");
	stackEqual((yield T(_, F_, 3, failAsync_)), rawStack("Error: 3/failAsync:15") + "/A:33/F:83");
	stackEqual((yield T(_, F_, 3, failSync_)), rawStack("Error: 3/fail:20/failSync:21") + "/A:33/F:83");
	stackEqual((yield T(_, F_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 6, failAsync_)), rawStack("Error: 6/failAsync:15") + "/A:40/F:83");
	stackEqual((yield T(_, F_, 6, failSync_)), rawStack("Error: 6/fail:20/failSync:21") + "/A:40/F:83");
	stackEqual((yield T(_, F_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/B:49/A:42/F:83");
	stackEqual((yield T(_, F_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42/F:83");
	stackEqual((yield T(_, F_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/F:83");
	stackEqual((yield T(_, F_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/F:83");
	stackEqual((yield T(_, F_, 9, failAsync_)), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42/F:83");
	stackEqual((yield T(_, F_, 9, failSync_)), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42/F:83");
	stackEqual((yield T(_, F_, 10, failAsync_)), "END & END");
	stackEqual((yield T(_, F_, 10, failSync_)), "END & END");
	start();
;yield;}, 0));

asyncTest("loop", 8, fstreamline__.create(function(_) {
	stackEqual((yield T(_, I_, 4, failAsync_)), "0123");
	stackEqual((yield T(_, I_, 4, failSync_)), "0123");
	stackEqual((yield T(_, I_, 5, failAsync_)), "01234");
	stackEqual((yield T(_, I_, 5, failSync_)), "01234");
	stackEqual((yield T(_, I_, 6, failAsync_)), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 6, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 7, failAsync_)), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 7, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	start();
;yield;}, 0));
;yield;}, 0).call(this, function(err) {
  if (err) throw err;
}));