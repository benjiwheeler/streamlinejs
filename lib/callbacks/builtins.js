/*** Generated by streamline 0.12.1 (callbacks) - DO NOT EDIT ***/ var __rt=require('../callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; 







(function (exports) { 
    'use strict'; 
    var VERSION = 3; 
    
    
    
    var future = function (fn, args, i) { 
        var err, result, done, q = [], self = this; 
        
        args = Array.prototype.slice.call(args); 
        args[i] = function (e, r) { 
            err = e, result = r, done = true; 
            q && q.forEach(function (f) { 
                f.call(self, e, r); }); 
            
            q = null; }; 
        
        fn.apply(this, args); 
        return function F(cb) { 
            if (!cb) return F; 
            if (done) cb.call(self, err, result); else q.push(cb); }; }; 
    
    
    
    
    
    exports.funnel = function (max) { 
        max = max == null ? -1 : max; 
        if (max === 0) max = funnel.defaultSize; 
        if (typeof max !== 'number') throw new Error('bad max number: ' + max); 
        var queue = [], active = 0, closed = false; 
        
        
        
        var funCb = function (callback, fn) { 
            if (callback == null) return future(funCb, arguments, 0); 
            
            if (max < 0 || max == Infinity) return fn(callback); 
            
            queue.push({ fn: fn, cb: callback }); 
            
            
            
            
            function _doOne() { 
                var current = queue.splice(0, 1)[0]; 
                if (!current.cb) return current.fn(); 
                active++; 
                current.fn(function (err, result) { 
                    active--; 
                    if (!closed) { 
                        current.cb(err, result); 
                        while (active < max && queue.length > 0) _doOne(); } }); } 
            
            
            
            
            while (active < max && queue.length > 0) _doOne(); }; 
        
        var fun = __rt.streamlinify(funCb, 0); 
        
        fun.close = function () { 
            queue = [], closed = true; }; 
        
        return fun; }; 
    
    var funnel = exports.funnel; 
    funnel.defaultSize = 4; 
    
    function _parallel(options) { 
        if (typeof options === 'number') return options; 
        if (typeof options.parallel === 'number') return options.parallel; 
        return options.parallel ? -1 : 1; } 
    
    
    if (Array.prototype.forEach_ && Array.prototype.forEach_.version_ >= VERSION) return; 
    
    
    try { 
        Object.defineProperty({}, 'x', {}); } catch (e) { 
        
        return; } 
    
    
    var has = Object.prototype.hasOwnProperty; 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    delete Array.prototype.forEach_; 
    Object.defineProperty(Array.prototype, 'forEach_', { configurable: true, writable: true, enumerable: false, value: function value__1(_, options, fn, thisObj) { 
            
            
            
            var par, len, i, __this = this; var __frame = { name: 'value__1', line: 124 }; return __func(_, this, arguments, value__1, 0, __frame, function __$value__1() { 
                if (typeof options === 'function') { thisObj = fn, fn = options, options = 1; } par = _parallel(options); 
                
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                return function __$value__1(__then) { if (par === 1 || len <= 1) { 
                        i = 0; var __2 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__1() { __more = false; if (__2) { i++; } else { __2 = true; } var __1 = i < len; if (__1) { 
                                    return function __$value__1(__then) { if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 7, 0, __then, true, false), __this[i], i); } else { __then(); } }(function __$value__1() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } else { 
                        
                        
                        return __this.map_(__cb(_, __frame, 10, 0, __then, true, false), par, fn, thisObj); } }(function __$value__1() { 
                    
                    return _(null, __this); }); }); } }); 
    
    
    Array.prototype.forEach_.version_ = VERSION; 
    
    
    delete Array.prototype.map_; 
    Object.defineProperty(Array.prototype, 'map_', { configurable: true, writable: true, enumerable: false, value: function value__2(_, options, fn, thisObj) { 
            
            
            
            var par, len, result, i, fun, __this = this; var __frame = { name: 'value__2', line: 147 }; return __func(_, this, arguments, value__2, 0, __frame, function __$value__2() { 
                if (typeof options === 'function') { thisObj = fn, fn = options, options = 1; } par = _parallel(options); 
                
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                
                return function __$value__2(__then) { if (par === 1 || len <= 1) { 
                        result = new Array(len); 
                        i = 0; var __4 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__4) { i++; } else { __4 = true; } var __3 = i < len; if (__3) { 
                                    return function __$value__2(__then) { if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 9, 0, function ___(__0, __1) { result[i] = __1; __then(); }, true, false), __this[i], i); } else { __then(); } }(function __$value__2() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } else { 
                        
                        fun = funnel(par); 
                        
                        result = __this.map(function (elt, i) { 
                            return fun(false, function __1(_) { var __frame = { name: '__1', line: 161 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { 
                                    return fn.call(thisObj, __cb(_, __frame, 1, 0, _, true, false), elt, i); }); }); }); 
                        
                        
                        i = 0; var __7 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__7) { i++; } else { __7 = true; } var __6 = i < len; if (__6) { 
                                    return function __$value__2(__then) { if (has.call(__this, i)) { return result[i](__cb(_, __frame, 19, 0, function ___(__0, __2) { result[i] = __2; __then(); }, true, false)); } else { __then(); } }(function __$value__2() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } }(function __$value__2() { 
                    
                    
                    return _(null, result); }); }); } }); 
    
    
    
    
    delete Array.prototype.filter_; 
    Object.defineProperty(Array.prototype, 'filter_', { configurable: true, writable: true, enumerable: false, value: function value__3(_, options, fn, thisObj) { 
            
            
            
            var par, result, len, i, elt, __this = this; var __frame = { name: 'value__3', line: 179 }; return __func(_, this, arguments, value__3, 0, __frame, function __$value__3() { 
                if (typeof options === 'function') { thisObj = fn, fn = options, options = 1; } par = _parallel(options); 
                
                thisObj = thisObj !== undefined ? thisObj : __this; result = []; 
                len = __this.length; 
                
                return function __$value__3(__then) { if (par === 1 || len <= 1) { 
                        i = 0; var __5 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__3() { __more = false; if (__5) { i++; } else { __5 = true; } var __4 = i < len; if (__4) { 
                                    return function __$value__3(__then) { if (has.call(__this, i)) { elt = __this[i]; 
                                            
                                            return fn.call(thisObj, __cb(_, __frame, 10, 0, function ___(__0, __3) { var __2 = __3; return function __$value__3(__then) { if (__2) { result.push(elt); __then(); } else { __then(); } }(__then); }, true, false), elt); } else { __then(); } }(function __$value__3() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } else { 
                        
                        
                        
                        return __this.map_(__cb(_, __frame, 14, 0, __then, true, false), par, function __1(_, elt) { var __frame = { name: '__1', line: 193 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { 
                                return fn.call(thisObj, __cb(_, __frame, 1, 0, function ___(__0, __2) { var __1 = __2; return function __$__1(__then) { if (__1) { result.push(elt); __then(); } else { __then(); } }(_); }, true, false), elt); }); }, thisObj); } }(function __$value__3() { 
                    
                    
                    return _(null, result); }); }); } }); 
    
    
    
    
    delete Array.prototype.every_; 
    Object.defineProperty(Array.prototype, 'every_', { configurable: true, writable: true, enumerable: false, value: function value__4(_, options, fn, thisObj) { 
            
            
            
            var par, len, i, fun, futures, __this = this; var __frame = { name: 'value__4', line: 207 }; return __func(_, this, arguments, value__4, 0, __frame, function __$value__4() { 
                if (typeof options === 'function') { thisObj = fn, fn = options, options = 1; } par = _parallel(options); 
                
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                return function __$value__4(__then) { if (par === 1 || len <= 1) { 
                        i = 0; var __8 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__8) { i++; } else { __8 = true; } var __7 = i < len; if (__7) { 
                                    
                                    return function __$value__4(_) { var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } return fn.call(thisObj, __cb(_, __frame, 8, 0, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true, false), __this[i]); }(__cb(_, __frame, 8, 0, function ___(__0, __4) { var __3 = __4; return function __$value__4(__then) { if (__3) { return _(null, false); } else { __then(); } }(function __$value__4() { while (__more) { __loop(); } __more = true; }); }, true, false)); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } else { 
                        
                        fun = funnel(par); 
                        futures = __this.map(function (elt) { 
                            
                            return fun(false, function __1(_) { var __frame = { name: '__1', line: 220 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { 
                                    return fn.call(thisObj, __cb(_, __frame, 1, 0, _, true, false), elt); }); }); }); 
                        
                        
                        i = 0; var __11 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__11) { i++; } else { __11 = true; } var __10 = i < len; if (__10) { 
                                    return function __$value__4(_) { var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } return futures[i](__cb(_, __frame, 18, 0, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true, false)); }(__cb(_, __frame, 18, 0, function ___(__0, __6) { var __5 = __6; return function __$value__4(__then) { if (__5) { 
                                                fun.close(); 
                                                return _(null, false); } else { __then(); } }(function __$value__4() { while (__more) { __loop(); } __more = true; }); }, true, false)); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } }(function __$value__4() { 
                    
                    
                    
                    return _(null, true); }); }); } }); 
    
    
    
    
    delete Array.prototype.some_; 
    Object.defineProperty(Array.prototype, 'some_', { configurable: true, writable: true, enumerable: false, value: function value__5(_, options, fn, thisObj) { 
            
            
            
            var par, len, i, fun, futures, __this = this; var __frame = { name: 'value__5', line: 241 }; return __func(_, this, arguments, value__5, 0, __frame, function __$value__5() { 
                if (typeof options === 'function') { thisObj = fn, fn = options, options = 1; } par = _parallel(options); 
                
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                return function __$value__5(__then) { if (par === 1 || len <= 1) { 
                        i = 0; var __8 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__8) { i++; } else { __8 = true; } var __7 = i < len; if (__7) { 
                                    return function __$value__5(_) { var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } return fn.call(thisObj, __cb(_, __frame, 7, 0, _, true, false), __this[i]); }(__cb(_, __frame, 7, 0, function ___(__0, __4) { var __3 = __4; return function __$value__5(__then) { if (__3) { return _(null, true); } else { __then(); } }(function __$value__5() { while (__more) { __loop(); } __more = true; }); }, true, false)); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } else { 
                        
                        fun = funnel(par); 
                        futures = __this.map(function (elt) { 
                            
                            return fun(false, function __1(_) { var __frame = { name: '__1', line: 253 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { 
                                    return fn.call(thisObj, __cb(_, __frame, 1, 0, _, true, false), elt); }); }); }); 
                        
                        
                        i = 0; var __11 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__11) { i++; } else { __11 = true; } var __10 = i < len; if (__10) { 
                                    return function __$value__5(_) { var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } return futures[i](__cb(_, __frame, 17, 0, _, true, false)); }(__cb(_, __frame, 17, 0, function ___(__0, __6) { var __5 = __6; return function __$value__5(__then) { if (__5) { 
                                                fun.close(); 
                                                return _(null, true); } else { __then(); } }(function __$value__5() { while (__more) { __loop(); } __more = true; }); }, true, false)); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(__then); } }(function __$value__5() { 
                    
                    
                    
                    return _(null, false); }); }); } }); 
    
    
    
    
    delete Array.prototype.reduce_; 
    Object.defineProperty(Array.prototype, 'reduce_', { configurable: true, writable: true, enumerable: false, value: function value__6(_, fn, v, thisObj) { 
            
            
            
            var len, i, __this = this; var __frame = { name: 'value__6', line: 274 }; return __func(_, this, arguments, value__6, 0, __frame, function __$value__6() { 
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                i = 0; var __3 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__6() { __more = false; if (__3) { i++; } else { __3 = true; } var __2 = i < len; if (__2) { 
                            return function __$value__6(__then) { if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 0, function ___(__0, __1) { v = __1; __then(); }, true, false), v, __this[i], i, __this); } else { __then(); } }(function __$value__6() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(function __$value__6() { 
                    
                    return _(null, v); }); }); } }); 
    
    
    
    
    delete Array.prototype.reduceRight_; 
    Object.defineProperty(Array.prototype, 'reduceRight_', { configurable: true, writable: true, enumerable: false, value: function value__7(_, fn, v, thisObj) { 
            
            
            
            var len, i, __this = this; var __frame = { name: 'value__7', line: 290 }; return __func(_, this, arguments, value__7, 0, __frame, function __$value__7() { 
                thisObj = thisObj !== undefined ? thisObj : __this; len = __this.length; 
                
                i = len - 1; var __3 = false; return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__7() { __more = false; if (__3) { i--; } else { __3 = true; } var __2 = i >= 0; if (__2) { 
                            return function __$value__7(__then) { if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 0, function ___(__0, __1) { v = __1; __then(); }, true, false), v, __this[i], i, __this); } else { __then(); } }(function __$value__7() { while (__more) { __loop(); } __more = true; }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(function __$value__7() { 
                    
                    return _(null, v); }); }); } }); 
    
    
    
    
    
    
    delete Array.prototype.sort_; 
    Object.defineProperty(Array.prototype, 'sort_', { configurable: true, writable: true, enumerable: false, value: function value__8(_, compare, beg, end) { 
            
            
            
            var array, __this = this; 
            
            
            
            
            function _qsort(_, beg, end) { var tmp, mid, o, nbeg, nend; var __frame = { name: '_qsort', line: 313 }; return __func(_, this, arguments, _qsort, 0, __frame, function __$_qsort() { 
                    if (beg >= end) { return _(null); } 
                    
                    return function __$_qsort(__then) { if (end == beg + 1) { 
                            return compare(__cb(_, __frame, 4, 0, function ___(__0, __4) { var __3 = __4 > 0; return function __$_qsort(__then) { if (__3) { tmp = array[beg]; 
                                        
                                        array[beg] = array[end]; 
                                        array[end] = tmp; __then(); } else { __then(); } }(function __$_qsort() { 
                                    
                                    return _(null); }); }, true, false), array[beg], array[end]); } else { __then(); } }(function __$_qsort() { mid = Math.floor((beg + end) / 2); 
                        
                        
                        o = array[mid]; 
                        nbeg = beg; 
                        nend = end; 
                        
                        
                        return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; var __6 = nbeg <= nend; if (__6) { 
                                    return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return function __$_qsort(_) { return function __$_qsort(_) { var __1 = nbeg < end; if (!__1) { return _(null, __1); } return compare(__cb(_, __frame, 18, 0, function ___(__0, __3) { var __2 = __3 < 0; return _(null, __2); }, true, false), array[nbeg], o); }(__cb(_, __frame, 18, 0, _, true, false)); }(__cb(_, __frame, 18, 0, function ___(__0, __7) { if (__7) { nbeg++; while (__more) { __loop(); } __more = true; } else { __break(); } }, true, false)); }); do { __loop(); } while (__more); __more = true; }(function __$_qsort() { 
                                        return function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return function __$_qsort(_) { return function __$_qsort(_) { var __2 = beg < nend; if (!__2) { return _(null, __2); } return compare(__cb(_, __frame, 19, 0, function ___(__0, __4) { var __3 = __4 < 0; return _(null, __3); }, true, false), o, array[nend]); }(__cb(_, __frame, 19, 0, _, true, false)); }(__cb(_, __frame, 19, 0, function ___(__0, __9) { if (__9) { nend--; while (__more) { __loop(); } __more = true; } else { __break(); } }, true, false)); }); do { __loop(); } while (__more); __more = true; }(function __$_qsort() { 
                                            
                                            if (nbeg <= nend) { tmp = array[nbeg]; 
                                                
                                                array[nbeg] = array[nend]; 
                                                array[nend] = tmp; 
                                                nbeg++; 
                                                nend--; } while (__more) { __loop(); } __more = true; }); }); } else { __break(); } }); do { __loop(); } while (__more); __more = true; }(function __$_qsort() { 
                            
                            
                            
                            return function __$_qsort(__then) { if (nbeg < end) { return _qsort(__cb(_, __frame, 30, 0, __then, true, false), nbeg, end); } else { __then(); } }(function __$_qsort() { 
                                return function __$_qsort(__then) { if (beg < nend) { return _qsort(__cb(_, __frame, 31, 0, __then, true, false), beg, nend); } else { __then(); } }(_); }); }); }); }); } var __frame = { name: 'value__8', line: 308 }; return __func(_, this, arguments, value__8, 0, __frame, function __$value__8() { array = __this; beg = beg || 0; end = end == null ? array.length - 1 : end; 
                
                return _qsort(__cb(_, __frame, 38, 0, function __$value__8() { 
                    return _(null, array); }, true, false), beg, end); }); } }); 
    
    
    
    
    
    
    
    
    
    
    
    delete Function.prototype.apply_; 
    Object.defineProperty(Function.prototype, 'apply_', { configurable: true, writable: true, enumerable: false, value: function (callback, thisObj, args, index) { 
            
            
            
            
            args = Array.prototype.slice.call(args, 0); 
            args.splice(index != null && index >= 0 ? index : args.length, 0, callback); 
            return this.apply(thisObj, args); } }); }(typeof exports !== 'undefined' ? exports : Streamline.builtins = Streamline.builtins || {}));