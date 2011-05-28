/*** Generated by streamline 0.1.22 - DO NOT EDIT ***/

"use strict";
var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, fn) { var ctx = __global.__context; return function(err, result) { __global.__context = ctx; if (err) return _(err); try { return fn(null, result); } catch (ex) { return __propagate(_, ex); } } }
function __future(fn, args, i) { var done, err, result; var cb = function(e, r) { done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function(e, r) { cb(e, r); }; fn.apply(this, args); return function(_) { if (done) _.call(this, err, result); else cb = _.bind(this); }.bind(this); }
function __propagate(_, err) { try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err) { if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
var fs = require("fs");
var fspath = require("path");
var transform = require("./transform");
var flows = require("../util/flows");
function _exists(callback, fname) {
  fspath.exists(fname, function __1(result) {
    callback(null, result);
  });
};
function _mkdir(dir, mode, _) {
  if (!_) {
    return __future(_mkdir, arguments, 2);
  }
;
  var __then = _;
  var p = fspath.dirname(dir);
  return function(__then) {
    return _exists(p, __cb(_, function(__0, __1) {
      if (!__1) {
        return _mkdir(p, mode, __cb(_, __then));
      }
    ;
      return __then();
    }));
  }(function() {
    return fs.mkdir(dir, mode, __cb(_, __then));
  });
};
function mtime(_, fname) {
  if (!_) {
    return __future(mtime, arguments, 0);
  }
;
  var __then = _;
  return function __1(_) {
    if (!_) {
      return __future(__1, arguments, 0);
    }
  ;
    var __then = _;
    return _exists(__cb(_, function(__0, __1) {
      if (__1) {
        return fs.stat(fname, __cb(_, function(__0, __2) {
          return _(null, __2.mtime);
        }));
      }
       else {
        return _(null, 0);
      }
    ;
    }), fname);
  }(_);
};
exports.loadFile = function __1(_, path, options) {
  if (!_) {
    return __future(__1, arguments, 0);
  }
;
  var __then = _;
  var transformed;
  if ((path.indexOf(".js") == (path.length - 3))) {
    path = path.substring(0, (path.length - 3));
  };
  options = (options || {
  });
  options.sourceName = path;
  var dontSave = (path[(path.length - 1)] == "_");
  if (dontSave) {
    path = path.substring(0, (path.length - 1));
    options.lines = (options.lines || "preserve");
  }
   else {
    options.lines = (options.lines || "mark");
  }
;
  var js = (path + ".js");
  var js_ = (path + "_.js");
  return mtime(__cb(_, function(__0, mtimejs) {
    return mtime(__cb(_, function(__0, mtimejs_) {
      var banner = transform.banner();
      if ((options.lines !== "preserve")) {
        banner += "\n";
      };
      if (mtimejs_) {
        return fs.readFile(js_, "utf8", __cb(_, function(__0, content) {
          return function __1(_) {
            if (!_) {
              return __future(__1, arguments, 0);
            }
          ;
            var __then = _;
            var __val = mtimejs;
            if ((!__val == true)) {
              return _(null, __val);
            }
          ;
            return fs.readFile(js, "utf8", _);
          }(__cb(_, function(__0, __2) {
            transformed = __2;
            if ((((transformed && (mtimejs_ < mtimejs)) && (transformed.substring(0, banner.length) == banner)) && !options.force)) {
              return _(null, transformed)
            };
            if (options.verbose) {
              console.log(("streamline: transforming: " + js_));
            };
            transformed = (banner + transform.transform(content, options));
            return function(__then) {
              if (!dontSave) {
                return function(__then) {
                  return function(_) {
                    try {
                      return fs.writeFile(js, transformed, "utf8", __cb(_, __then));
                    } catch (e) {
                      return __propagate(_, e);
                    };
                  }(function(ex, __result) {
                    try {
                      if (ex) {
                      
                      }
                       else return _(null, __result)
                    ;
                    } catch (e) {
                      return __propagate(_, e);
                    };
                    return __then();
                  });
                }(function() {
                  try {
                    return __then();
                  } catch (e) {
                    return __propagate(_, e);
                  };
                });
              }
            ;
              return __then();
            }(function() {
              return _(null, transformed);
            });
          }));
        }));
      }
       else {
        return fs.readFile(js, "utf8", _);
      }
    ;
    }), js_);
  }), js);
};
function mtimeSync(fname) {
  try {
    return fs.statSync(fname).mtime;
  } catch (ex) {
    return 0;
  };
};
exports.loadFileSync = function __2(path, options) {
  if ((path.indexOf(".js") == (path.length - 3))) {
    path = path.substring(0, (path.length - 3));
  };
  options = (options || {
  });
  options.sourceName = path;
  var dontSave = (path[(path.length - 1)] == "_");
  if (dontSave) {
    path = path.substring(0, (path.length - 1));
    options.lines = (options.lines || "preserve");
  }
   else {
    options.lines = (options.lines || "mark");
  }
;
  var js = (path + ".js");
  var js_ = (path + "_.js");
  var mtimejs = mtimeSync(js);
  var mtimejs_ = mtimeSync(js_);
  var banner = transform.banner();
  if ((options.lines !== "preserve")) {
    banner += "\n";
  };
  if (mtimejs_) {
    var content = fs.readFileSync(js_, "utf8");
    var transformed = (mtimejs && fs.readFileSync(js, "utf8"));
    if ((((transformed && (mtimejs_ < mtimejs)) && (transformed.substring(0, banner.length) == banner)) && !options.force)) {
      return transformed
    };
    if (options.verbose) {
      console.log(("streamline: transforming: " + js_));
    };
    var transformed = (banner + transform.transform(content, options));
    if (!dontSave) {
      try {
        fs.writeFileSync(js, transformed, "utf8");
      } catch (ex) {
      
      };
    }
  ;
    return transformed;
  }
   else {
    return fs.readFileSync(js, "utf8");
  }
;
};
exports.compile = function __3(_, paths, options) {
  if (!_) {
    return __future(__3, arguments, 0);
  }
;
  var __then = _;
  function _compile(_, path, options) {
    if (!_) {
      return __future(_compile, arguments, 0);
    }
  ;
    var __then = _;
    return fs.stat(path, __cb(_, function(__0, stat) {
      if (stat.isDirectory()) {
        return fs.readdir(path, __cb(_, function(__0, __4) {
          return flows.each(__cb(_, __then), __4, function __1(_, f) {
            if (!_) {
              return __future(__1, arguments, 0);
            }
          ;
            var __then = _;
            return _compile(__cb(_, __then), ((path + "/") + f), options);
          });
        }));
      }
       else {
        if ((stat.isFile() && path.match(/_\.js$/))) {
          return function(__then) {
            return function(_) {
              try {
                var js = (path.substring(0, (path.length - 4)) + ".js");
                return exports.loadFile(__cb(_, __then), js, options);
              } catch (e) {
                return __propagate(_, e);
              };
            }(function(ex, __result) {
              try {
                if (ex) {
                  console.error(ex.message);
                  failed++;
                }
                 else return _(null, __result)
              ;
              } catch (e) {
                return __propagate(_, e);
              };
              return __then();
            });
          }(function() {
            try {
              return __then();
            } catch (e) {
              return __propagate(_, e);
            };
          });
        }
      ;
        return __then();
      }
    ;
    }));
  };
  var failed = 0;
  options = (options || {
  });
  if (options.verbose) {
    console.log(("transform version: " + transform.version));
  };
  if ((!paths || (paths.length == 0))) {
    return _(new Error("cannot compile: no files specified"))
  };
  var cwd = process.cwd;
  return flows.each(__cb(_, function() {
    if (failed) {
      return _(new Error((("errors found in " + failed) + " files")))
    };
    return __then();
  }), paths, function __1(_, path) {
    if (!_) {
      return __future(__1, arguments, 0);
    }
  ;
    var __then = _;
    return _compile(__cb(_, __then), fspath.join(cwd, path), options);
  });
};