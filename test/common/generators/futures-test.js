/*** Generated by streamline 0.5.0 (generators) - DO NOT EDIT ***/var fstreamline__ = require("streamline/lib/generators/runtime"); (fstreamline__.create(function*(_) {var delay_ = fstreamline__.create(delay, 2), delay2_ = fstreamline__.create(delay2, 4), join_ = fstreamline__.create(join, 8); var module = QUnit.module;
var flows = require("streamline/lib/util/flows");

function* delay(millis, val, _) {
	(yield fstreamline__.invoke(null, setTimeout, [_, millis], 0));
	yield ( val);
}

module("futures");

asyncTest("no timeout", 1, fstreamline__.create(function*(_) {
	var f = delay_(1, 'a');
	equals((yield fstreamline__.invoke(null, f, [_], 0)), 'a', "no timeout");
	start();
}, 0));
asyncTest("result before timeout", 1, fstreamline__.create(function*(_) {
	var f = delay_(1, 'a');
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 10, return: 'b' }], 0)), 'a', "got result");
	start();
}, 0));
asyncTest("timeout returns before result", 3, fstreamline__.create(function*(_) {
	var f = delay_(20, 'a');
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 1, return: 'b' }], 0)), 'b', "got timeout");
	ok(f.cancelled, "future got cancelled");
	try {
		equal((yield fstreamline__.invoke(null, f, [_, { timeout: 20, return: 'b' }], 0)), 'c');
	} catch (ex) {
		equals(ex.message, "future cancelled", "cannot reuse cancelled future");
	}
	start();
}, 0));
asyncTest("timeout throws before result", 1, fstreamline__.create(function*(_) {
	var f = delay_(20, 'a');
	try {
		equal((yield fstreamline__.invoke(null, f, [_, { timeout: 1, throw: 'b' }], 0)), 'c');
	} catch (ex) {
		equals(ex.message, 'b', "throws before result");
	}
	start();
}, 0));
asyncTest("probe with return", 2, fstreamline__.create(function*(_) {
	var f = delay_(20, 'a');
	equal((yield fstreamline__.invoke(null, f, [_, { timeout: 1, return: 'b', probe: true }], 0)), 'b', "probe before result");
	equal((yield fstreamline__.invoke(null, f, [_, { timeout: 40, return: 'b', probe: true }], 0)), 'a', "probe after result");
	start();
}, 0));
asyncTest("probe with throw", 2, fstreamline__.create(function*(_) {
	var f = delay_(20, 'a');
	try {
		equal((yield fstreamline__.invoke(null, f, [_, { timeout: 1, throw: 'b', probe: true }], 0)), 'c');
	} catch (ex) {
		equals(ex.message, 'b', "probe before result");
	}
	equal((yield fstreamline__.invoke(null, f, [_, { timeout: 40, throw: 'b', probe: true }], 0)), 'a', "probe after result");
	start();
}, 0));

function* delay2(ms1, ms2, val, step, _) {
	step.i = 1;
	(yield fstreamline__.invoke(null, setTimeout, [_, ms1], 0));
	step.i++;
	(yield fstreamline__.invoke(null, setTimeout, [_, ms2], 0));
	step.i++;
	yield ( val);

}

asyncTest("cancel before first timeout", 4, fstreamline__.create(function*(_) {
	var step = {};
	var f = delay2_(20, 20, 'a', step);
	equals(step.i, 1, "step ok");
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 1, return: 'b' }], 0)), 'b', "timed out ok");
	equals(step.i, 1, "step ok after timeout");
	(yield fstreamline__.invoke(null, setTimeout, [_, 40], 0));
	equals(step.i, 1, "cancelled ok");
	start();
}, 0));
asyncTest("cancel between first and second timeouts", 4, fstreamline__.create(function*(_) {
	var step = {};
	var f = delay2_(20, 20, 'a', step);
	equals(step.i, 1, "step ok");
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 30, return: 'b' }], 0)), 'b', "timed out ok");
	equals(step.i, 2, "step ok after intermediate timeout");
	(yield fstreamline__.invoke(null, setTimeout, [_, 20], 0));
	equals(step.i, 2, "cancelled ok");
	start();
}, 0));

function* join(ms1, ms2, val1, step1, ms3, ms4, val2, step2, _) {
	var f1 = delay2_(ms1, ms2, val1, step1);
	var f2 = delay2_(ms3, ms4, val2, step2);
	yield ( (yield fstreamline__.invoke(null, f1, [_], 0)) + (yield fstreamline__.invoke(null, f2, [_], 0)));
}

asyncTest("join returns before timeout", 3, fstreamline__.create(function*(_) {
	var step1 = {}, step2= {};
	var f = join_(10, 20, 'a', step1, 20, 20, 'b', step2);
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 60, return: 'c' }], 0)), 'ab', "no timeout ok");
	equals(step1.i, 3, "step1 ok");
	equals(step2.i, 3, "step2 ok");
	start();
}, 0));
asyncTest("join with short timeout", 5, fstreamline__.create(function*(_) {
	var step1 = {}, step2= {};
	var f = join_(10, 20, 'a', step1, 20, 20, 'b', step2);
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 15, return: 'c' }], 0)), 'c', "result ok");
	equals(step1.i, 2, "step1 ok");
	equals(step2.i, 1, "step2 ok");
	(yield fstreamline__.invoke(null, setTimeout, [_, 40], 0));
	equals(step1.i, 2, "step1 cancelled ok");
	equals(step2.i, 1, "step2 cancelled ok");
	start();
}, 0));
asyncTest("join with intermediate timeout", 5, fstreamline__.create(function*(_) {
	var step1 = {}, step2= {};
	var f = join_(10, 20, 'a', step1, 20, 20, 'b', step2);
	equals((yield fstreamline__.invoke(null, f, [_, { timeout: 35, return: 'c' }], 0)), 'c', "result ok");
	equals(step1.i, 3, "step1 ok");
	equals(step2.i, 2, "step2 ok");
	(yield fstreamline__.invoke(null, setTimeout, [_, 20], 0));
	equals(step1.i, 3, "step1 cancelled ok");
	equals(step2.i, 2, "step2 cancelled ok");
	start();
}, 0));
}, 0).call(this, function(err) {
  if (err) throw err;
}));