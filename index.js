(function() {
  "use strict";
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
      return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]";
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function arrayEach(array, iteratee) {
    var index2 = -1, length = array ? array.length : 0;
    while (++index2 < length) {
      if (iteratee(array[index2], index2, array) === false) {
        break;
      }
    }
    return array;
  }
  function baseTimes(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeKeys = overArg(Object.keys, Object);
  function arrayLikeKeys(value, inherited) {
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var baseEach = createBaseEach(baseForOwn);
  var baseFor = createBaseFor();
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index2-- : ++index2 < length) {
        if (iteratee(iterable[index2], index2, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function forEach(collection, iteratee) {
    var func = isArray(collection) ? arrayEach : baseEach;
    return func(collection, typeof iteratee == "function" ? iteratee : identity);
  }
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function identity(value) {
    return value;
  }
  var lodash_foreach = forEach;
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var argsTag$1 = "[object Arguments]", funcTag$1 = "[object Function]", genTag$1 = "[object GeneratorFunction]";
  var reIsUint$1 = /^(?:0|[1-9]\d*)$/;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function baseTimes$1(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  function overArg$1(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  var objectToString$1 = objectProto$1.toString;
  var propertyIsEnumerable$1 = objectProto$1.propertyIsEnumerable;
  var nativeKeys$1 = overArg$1(Object.keys, Object), nativeMax = Math.max;
  var nonEnumShadows = !propertyIsEnumerable$1.call({ "valueOf": 1 }, "valueOf");
  function arrayLikeKeys$1(value, inherited) {
    var result = isArray$1(value) || isArguments$1(value) ? baseTimes$1(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && (key == "length" || isIndex$1(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function baseKeys$1(object) {
    if (!isPrototype$1(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$1.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function baseRest(func, start) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index2 < length) {
        array[index2] = args[start + index2];
      }
      index2 = -1;
      var otherArgs = Array(start + 1);
      while (++index2 < start) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      assignValue(object, key, newValue === void 0 ? source[key] : newValue);
    }
    return object;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index2 < length) {
        var source = sources[index2];
        if (source) {
          assigner(object, source, index2, customizer);
        }
      }
      return object;
    });
  }
  function isIndex$1(value, length) {
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (typeof value == "number" || reIsUint$1.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isIterateeCall(value, index2, object) {
    if (!isObject$1(object)) {
      return false;
    }
    var type = typeof index2;
    if (type == "number" ? isArrayLike$1(object) && isIndex$1(index2, object.length) : type == "string" && index2 in object) {
      return eq(object[index2], value);
    }
    return false;
  }
  function isPrototype$1(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$1;
    return value === proto;
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments$1(value) {
    return isArrayLikeObject$1(value) && hasOwnProperty$1.call(value, "callee") && (!propertyIsEnumerable$1.call(value, "callee") || objectToString$1.call(value) == argsTag$1);
  }
  var isArray$1 = Array.isArray;
  function isArrayLike$1(value) {
    return value != null && isLength$1(value.length) && !isFunction$1(value);
  }
  function isArrayLikeObject$1(value) {
    return isObjectLike$1(value) && isArrayLike$1(value);
  }
  function isFunction$1(value) {
    var tag = isObject$1(value) ? objectToString$1.call(value) : "";
    return tag == funcTag$1 || tag == genTag$1;
  }
  function isLength$1(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }
  function isObject$1(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike$1(value) {
    return !!value && typeof value == "object";
  }
  var assign = createAssigner(function(object, source) {
    if (nonEnumShadows || isPrototype$1(source) || isArrayLike$1(source)) {
      copyObject(source, keys$1(source), object);
      return;
    }
    for (var key in source) {
      if (hasOwnProperty$1.call(source, key)) {
        assignValue(object, key, source[key]);
      }
    }
  });
  function keys$1(object) {
    return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys$1(object);
  }
  var lodash_assign = assign;
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  var lodash_clonedeep = createCommonjsModule(function(module, exports) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER2 = 9007199254740991;
    var argsTag2 = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint2 = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag2] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag2] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach2(array, iteratee) {
      var index2 = -1, length = array ? array.length : 0;
      while (++index2 < length) {
        if (iteratee(array[index2], index2, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index2 = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index2];
      }
      while (++index2 < length) {
        accumulator = iteratee(accumulator, array[index2], index2, array);
      }
      return accumulator;
    }
    function baseTimes2(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index2 = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    function overArg2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index2 = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto2 = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto2.hasOwnProperty;
    var objectToString2 = objectProto2.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array = root.Uint8Array, getPrototype = overArg2(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys2 = overArg2(Object.keys, Object);
    var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys2(value, inherited) {
      var result = isArray2(value) || isArguments2(value) ? baseTimes2(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex2(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue2(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq2(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject2(source, keys2(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject2(value)) {
        return value;
      }
      var isArr = isArray2(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag2 || tag == genTag2;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag2 || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys2(value);
      }
      arrayEach2(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue2(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject2(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString2.call(value);
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys2(object) {
      if (!isPrototype2(object)) {
        return nativeKeys2(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index2 = -1, length = source.length;
      array || (array = Array(length));
      while (++index2 < length) {
        array[index2] = source[index2];
      }
      return array;
    }
    function copyObject2(source, props, object, customizer) {
      object || (object = {});
      var index2 = -1, length = props.length;
      while (++index2 < length) {
        var key = props[index2];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        assignValue2(object, key, newValue === void 0 ? source[key] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject2(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg2(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString2.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length, result = array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate(getPrototype(object)) : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex2(value, length) {
      length = length == null ? MAX_SAFE_INTEGER2 : length;
      return !!length && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype2(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep(value) {
      return baseClone(value, true, true);
    }
    function eq2(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments2(value) {
      return isArrayLikeObject2(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable2.call(value, "callee") || objectToString2.call(value) == argsTag2);
    }
    var isArray2 = Array.isArray;
    function isArrayLike2(value) {
      return value != null && isLength2(value.length) && !isFunction2(value);
    }
    function isArrayLikeObject2(value) {
      return isObjectLike2(value) && isArrayLike2(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction2(value) {
      var tag = isObject2(value) ? objectToString2.call(value) : "";
      return tag == funcTag2 || tag == genTag2;
    }
    function isLength2(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike2(value) {
      return !!value && typeof value == "object";
    }
    function keys2(object) {
      return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = cloneDeep;
  });
  var lodash_filter = createCommonjsModule(function(module, exports) {
    var LARGE_ARRAY_SIZE = 200;
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991;
    var argsTag2 = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint2 = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array ? array.length : 0, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arraySome(array, predicate) {
      var index2 = -1, length = array ? array.length : 0;
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true;
        }
      }
      return false;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    function baseTimes2(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index2 = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    function overArg2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index2 = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto2 = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto2.hasOwnProperty;
    var objectToString2 = objectProto2.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Symbol2 = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice = arrayProto.splice;
    var nativeKeys2 = overArg2(Object.keys, Object);
    var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index2 = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys2(value, inherited) {
      var result = isArray2(value) || isArguments2(value) ? baseTimes2(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex2(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq2(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    var baseEach2 = createBaseEach2(baseForOwn2);
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach2(collection, function(value, index2, collection2) {
        if (predicate(value, index2, collection2)) {
          result.push(value);
        }
      });
      return result;
    }
    var baseFor2 = createBaseFor2();
    function baseForOwn2(object, iteratee) {
      return object && baseFor2(object, iteratee, keys2);
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index2 = 0, length = path.length;
      while (object != null && index2 < length) {
        object = object[toKey(path[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    function baseGetTag(value) {
      return objectToString2.call(value);
    }
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObject2(value) && !isObjectLike2(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = arrayTag, othTag = arrayTag;
      if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag2 ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag2 ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }
    function baseIsMatch(object, source, matchData, customizer) {
      var index2 = matchData.length, length = index2, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index2--) {
        var data = matchData[index2];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index2 < length) {
        data = matchData[index2];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags[objectToString2.call(value)];
    }
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity2;
      }
      if (typeof value == "object") {
        return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    function baseKeys2(object) {
      if (!isPrototype2(object)) {
        return nativeKeys2(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
      };
    }
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray2(value) ? value : stringToPath(value);
    }
    function createBaseEach2(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike2(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index2-- : ++index2 < length) {
          if (iteratee(iterable[index2], index2, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    function createBaseFor2(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index2 = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index2 < arrLength) {
        var arrValue = array[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!seen.has(othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq2(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys2(object), objLength = objProps.length, othProps = keys2(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getMatchData(object) {
      var result = keys2(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString2.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);
      var result, index2 = -1, length = path.length;
      while (++index2 < length) {
        var key = toKey(path[index2]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result) {
        return result;
      }
      var length = object ? object.length : 0;
      return !!length && isLength2(length) && isIndex2(key, length) && (isArray2(object) || isArguments2(object));
    }
    function isIndex2(value, length) {
      length = length == null ? MAX_SAFE_INTEGER2 : length;
      return !!length && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKey(value, object) {
      if (isArray2(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype2(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
      return value === proto;
    }
    function isStrictComparable(value) {
      return value === value && !isObject2(value);
    }
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match2, number2, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number2 || match2);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function filter(collection, predicate) {
      var func = isArray2(collection) ? arrayFilter : baseFilter;
      return func(collection, baseIteratee(predicate));
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq2(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments2(value) {
      return isArrayLikeObject2(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable2.call(value, "callee") || objectToString2.call(value) == argsTag2);
    }
    var isArray2 = Array.isArray;
    function isArrayLike2(value) {
      return value != null && isLength2(value.length) && !isFunction2(value);
    }
    function isArrayLikeObject2(value) {
      return isObjectLike2(value) && isArrayLike2(value);
    }
    function isFunction2(value) {
      var tag = isObject2(value) ? objectToString2.call(value) : "";
      return tag == funcTag2 || tag == genTag2;
    }
    function isLength2(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike2(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike2(value) && objectToString2.call(value) == symbolTag;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    function keys2(object) {
      return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
    }
    function identity2(value) {
      return value;
    }
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = filter;
  });
  var lodash_isequal = createCommonjsModule(function(module, exports) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER2 = 9007199254740991;
    var argsTag2 = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint2 = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true;
        }
      }
      return false;
    }
    function baseTimes2(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
      var index2 = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    function overArg2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index2 = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto2 = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto2.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto2.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys2 = overArg2(Object.keys, Object);
    var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys2(value, inherited) {
      var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes2(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq2(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString2(value);
    }
    function baseIsArguments(value) {
      return isObjectLike2(value) && baseGetTag(value) == argsTag2;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag2 ? objectTag : objTag;
      othTag = othTag == argsTag2 ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys2(object) {
      if (!isPrototype2(object)) {
        return nativeKeys2(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index2 < arrLength) {
        var arrValue = array[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq2(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable2.call(object, symbol);
      });
    };
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function isIndex2(value, length) {
      length = length == null ? MAX_SAFE_INTEGER2 : length;
      return !!length && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype2(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
      return value === proto;
    }
    function objectToString2(value) {
      return nativeObjectToString.call(value);
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq2(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments2 = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
    };
    var isArray2 = Array.isArray;
    function isArrayLike2(value) {
      return value != null && isLength2(value.length) && !isFunction2(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFunction2(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag2 || tag == genTag2 || tag == asyncTag || tag == proxyTag;
    }
    function isLength2(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
    }
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike2(value) {
      return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys2(object) {
      return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = isEqual;
  });
  var diacritics = {
    "a": ["a", "\xE0", "\xE1", "\xE2", "\xE3", "\xE4", "\xE5", "\xE6", "\u0101", "\u0103", "\u0105", "\u01CE", "\u01DF", "\u01E1", "\u01FB", "\u0201", "\u0203", "\u0227", "\u0250", "\u0251", "\u0252", "\u0363", "\u0430", "\u04D1", "\u04D3", "\u1D43", "\u1D44", "\u1D8F", "\u1E01", "\u1E9A", "\u1EA1", "\u1EA3", "\u1EA5", "\u1EA7", "\u1EA9", "\u1EAB", "\u1EAD", "\u1EAF", "\u1EB1", "\u1EB3", "\u1EB5", "\u1EB7", "\u2090", "\u2C65", "\uFF41"],
    "A": ["A", "\xC0", "\xC1", "\xC2", "\xC3", "\xC4", "\xC5", "\u0100", "\u0102", "\u0104", "\u01CD", "\u01DE", "\u01E0", "\u01FA", "\u0200", "\u0202", "\u0226", "\u023A", "\u0410", "\u04D0", "\u04D2", "\u1D00", "\u1D2C", "\u1E00", "\u1EA0", "\u1EA2", "\u1EA4", "\u1EA6", "\u1EA8", "\u1EAA", "\u1EAC", "\u1EAE", "\u1EB0", "\u1EB2", "\u1EB4", "\u1EB6", "\uFF21"],
    "b": ["b", "\u0180", "\u0183", "\u0253", "\u15AF", "\u1D47", "\u1D6C", "\u1D80", "\u1E03", "\u1E05", "\u1E07", "\uFF42"],
    "B": ["B", "\u0181", "\u0182", "\u0243", "\u0299", "\u16D2", "\u1D03", "\u1D2E", "\u1D2F", "\u1E02", "\u1E04", "\u1E06", "\uFF22"],
    "c": ["c", "\xE7", "\u0107", "\u0109", "\u010B", "\u010D", "\u0188", "\u023C", "\u0255", "\u0368", "\u1D04", "\u1D9C", "\u1E09", "\u2184", "\uFF43"],
    "C": ["C", "\xC7", "\u0106", "\u0108", "\u010A", "\u010C", "\u0187", "\u023B", "\u0297", "\u1E08", "\uFF23"],
    "d": ["d", "\u010F", "\u0111", "\u018B", "\u018C", "\u0221", "\u0256", "\u0257", "\u0369", "\u1D48", "\u1D6D", "\u1D81", "\u1D91", "\u1E0B", "\u1E0D", "\u1E0F", "\u1E11", "\u1E13", "\uFF44"],
    "D": ["D", "\u010E", "\u0110", "\u0189", "\u018A", "\u1D30", "\u1E0A", "\u1E0C", "\u1E0E", "\u1E10", "\u1E12", "\uFF24"],
    "e": ["e", "\xE8", "\xE9", "\xEA", "\xEB", "\u0113", "\u0115", "\u0117", "\u0119", "\u011B", "\u01DD", "\u0205", "\u0207", "\u0229", "\u0247", "\u0258", "\u0364", "\u1D49", "\u1D92", "\u1E15", "\u1E17", "\u1E19", "\u1E1B", "\u1E1D", "\u1EB9", "\u1EBB", "\u1EBD", "\u1EBF", "\u1EC1", "\u1EC3", "\u1EC5", "\u1EC7", "\u2091", "\uFF45"],
    "E": ["E", "\xC8", "\xC9", "\xCA", "\xCB", "\u0112", "\u0114", "\u0116", "\u0118", "\u011A", "\u0152", "\u018E", "\u0190", "\u0204", "\u0206", "\u0228", "\u0246", "\u025B", "\u025C", "\u0276", "\u0404", "\u042D", "\u044D", "\u0454", "\u04EC", "\u04ED", "\u1D07", "\u1D08", "\u1D31", "\u1D32", "\u1D4B", "\u1D4C", "\u1D93", "\u1D94", "\u1D9F", "\u1E14", "\u1E16", "\u1E18", "\u1E1A", "\u1E1C", "\u1EB8", "\u1EBA", "\u1EBC", "\u1EBE", "\u1EC0", "\u1EC2", "\u1EC4", "\u1EC6", "\uFF25", "\u{10401}", "\u{10429}"],
    "f": ["f", "\u0192", "\u1D6E", "\u1D82", "\u1DA0", "\u1E1F", "\uFF46"],
    "F": ["F", "\u0191", "\u1E1E", "\u214E", "\uFF26"],
    "g": ["g", "\u011D", "\u011F", "\u0121", "\u0123", "\u01E5", "\u01E7", "\u01F5", "\u0260", "\u0261", "\u1D4D", "\u1D77", "\u1D79", "\u1D83", "\u1DA2", "\u1E21", "\uFF47"],
    "G": ["G", "\u011C", "\u011E", "\u0120", "\u0122", "\u0193", "\u01E4", "\u01E6", "\u01F4", "\u0262", "\u029B", "\u1D33", "\u1E20", "\uFF27"],
    "h": ["h", "\u0125", "\u0127", "\u0195", "\u021F", "\u0265", "\u0266", "\u02AE", "\u02AF", "\u02B0", "\u02B1", "\u036A", "\u04BA", "\u04BB", "\u144B", "\u1DA3", "\u1E23", "\u1E25", "\u1E27", "\u1E29", "\u1E2B", "\u2C68", "\uFF48"],
    "H": ["H", "\u0124", "\u0126", "\u021E", "\u029C", "\u157C", "\u16BA", "\u16BB", "\u1D34", "\u1E22", "\u1E24", "\u1E26", "\u1E28", "\u1E2A", "\u2C67", "\uFF28"],
    "i": ["i", "\xEC", "\xED", "\xEE", "\xEF", "\u0129", "\u012B", "\u012D", "\u012F", "\u01D0", "\u0209", "\u020B", "\u0268", "\u0365", "\u1D09", "\u1D4E", "\u1D62", "\u1D96", "\u1DA4", "\u1E2D", "\u1E2F", "\u1EC9", "\u1ECB", "\uFF49"],
    "I": ["I", "\xCC", "\xCD", "\xCE", "\xCF", "\u0128", "\u012A", "\u012C", "\u012E", "\u0130", "\u01CF", "\u0208", "\u020A", "\u026A", "\u0406", "\u1D35", "\u1D7B", "\u1DA6", "\u1DA7", "\u1E2C", "\u1E2E", "\u1EC8", "\u1ECA", "\uFF29"],
    "j": ["j", "\u0135", "\u01F0", "\u0249", "\u029D", "\u02B2", "\u1DA1", "\u1DA8", "\uFF4A"],
    "J": ["J", "\u0134", "\u1D0A", "\u1D36", "\uFF2A"],
    "k": ["k", "\u0137", "\u0199", "\u01E9", "\u029E", "\u1D4F", "\u1D84", "\u1E31", "\u1E33", "\u1E35", "\u2C6A", "\uFF4B"],
    "K": ["K", "\u0136", "\u0198", "\u01E8", "\u1D37", "\u1E30", "\u1E32", "\u1E34", "\u2C69", "\uFF2B"],
    "l": ["l", "\u013A", "\u013C", "\u013E", "\u0140", "\u0142", "\u019A", "\u0234", "\u026B", "\u026C", "\u026D", "\u02E1", "\u1D85", "\u1DA9", "\u1DAA", "\u1E37", "\u1E39", "\u1E3B", "\u1E3D", "\u2113", "\u2C61"],
    "L": ["L", "\u0139", "\u013B", "\u013D", "\u013F", "\u0141", "\u023D", "\u029F", "\u1D0C", "\u1D38", "\u1DAB", "\u1E36", "\u1E38", "\u1E3A", "\u1E3C", "\u2C60", "\u2C62"],
    "m": ["m", "\u026F", "\u0270", "\u0271", "\u036B", "\u1D1F", "\u1D50", "\u1D5A", "\u1D6F", "\u1D86", "\u1DAC", "\u1DAD", "\u1E3F", "\u1E41", "\u1E43", "\u33A1", "\u33A5", "\uFF4D"],
    "M": ["M", "\u019C", "\u1D0D", "\u1D39", "\u1E3E", "\u1E40", "\u1E42", "\uFF2D"],
    "n": ["n", "\xF1", "\u0144", "\u0146", "\u0148", "\u0149", "\u019E", "\u01F9", "\u0235", "\u0272", "\u0273", "\u1D70", "\u1D87", "\u1DAE", "\u1DAF", "\u1E45", "\u1E47", "\u1E49", "\u1E4B", "\u207F", "\uFF4E"],
    "N": ["N", "\xD1", "\u0143", "\u0145", "\u0147", "\u019D", "\u01F8", "\u0220", "\u0274", "\u1D0E", "\u1D3A", "\u1D3B", "\u1DB0", "\u1E44", "\u1E46", "\u1E48", "\u1E4A", "\uFF2E"],
    "o": ["o", "\xF2", "\xF3", "\xF4", "\xF5", "\xF6", "\xF8", "\u014D", "\u014F", "\u0151", "\u01A1", "\u01D2", "\u01EB", "\u01ED", "\u01FF", "\u020D", "\u020F", "\u022B", "\u022D", "\u022F", "\u0231", "\u0275", "\u0366", "\u043E", "\u04E7", "\u04E9", "\u1D0F", "\u1D11", "\u1D13", "\u1D3C", "\u1D52", "\u1DB1", "\u1E4D", "\u1E4F", "\u1E51", "\u1E53", "\u1ECD", "\u1ECF", "\u1ED1", "\u1ED3", "\u1ED5", "\u1ED7", "\u1ED9", "\u1EDB", "\u1EDD", "\u1EDF", "\u1EE1", "\u1EE3", "\u2092", "\uFF4F", "\u{1042C}"],
    "O": ["O", "\xD2", "\xD3", "\xD4", "\xD5", "\xD6", "\xD8", "\u014C", "\u014E", "\u0150", "\u019F", "\u01A0", "\u01D1", "\u01EA", "\u01EC", "\u01FE", "\u020C", "\u020E", "\u022A", "\u022C", "\u022E", "\u0230", "\u041E", "\u04E6", "\u04E8", "\u1E4C", "\u1E4E", "\u1E50", "\u1E52", "\u1ECC", "\u1ECE", "\u1ED0", "\u1ED2", "\u1ED4", "\u1ED6", "\u1ED8", "\u1EDA", "\u1EDC", "\u1EDE", "\u1EE0", "\u1EE2", "\uFF2F", "\u{10404}"],
    "p": ["p", "\u1D56", "\u1D71", "\u1D7D", "\u1D88", "\u1E55", "\u1E57", "\uFF50"],
    "P": ["P", "\u01A4", "\u1D18", "\u1D3E", "\u1E54", "\u1E56", "\u2C63", "\uFF30"],
    "q": ["q", "\u024B", "\u02A0", "\u16E9", "\uFF51"],
    "Q": ["Q", "\u024A", "\uFF31"],
    "r": ["r", "\u0155", "\u0157", "\u0159", "\u0211", "\u0213", "\u024D", "\u0279", "\u027B", "\u02B3", "\u02B4", "\u02B5", "\u036C", "\u1D63", "\u1D72", "\u1D89", "\u1E59", "\u1E5B", "\u1E5D", "\u1E5F"],
    "R": ["R", "\u0154", "\u0156", "\u0158", "\u01A6", "\u0210", "\u0212", "\u024C", "\u0280", "\u0281", "\u02B6", "\u16B1", "\u1D19", "\u1D1A", "\u1D3F", "\u1E58", "\u1E5A", "\u1E5C", "\u1E5E", "\u2C64"],
    "s": ["s", "\u015B", "\u015D", "\u015F", "\u0161", "\u0219", "\u0282", "\u1506", "\u1D8A", "\u1E61", "\u1E63", "\u1E65", "\u1E67", "\u1E69", "\uFF53"],
    "S": ["S", "\u015A", "\u015C", "\u015E", "\u0160", "\u0218", "\u023F", "\u02E2", "\u1D74", "\u1E60", "\u1E62", "\u1E64", "\u1E66", "\u1E68", "\uFF33"],
    "t": ["t", "\u0163", "\u0165", "\u0167", "\u01AB", "\u01AD", "\u021B", "\u0287", "\u036D", "\u1D40", "\u1D57", "\u1D75", "\u1DB5", "\u1E6B", "\u1E6D", "\u1E6F", "\u1E71", "\u1E97", "\uFF54"],
    "T": ["T", "\u0162", "\u0164", "\u01AC", "\u01AE", "\u021A", "\u023E", "\u1D1B", "\u1D40", "\u1E6A", "\u1E6C", "\u1E6E", "\u1E70", "\uFF34"],
    "u": ["u", "\xF9", "\xFA", "\xFB", "\xFC", "\u0169", "\u016B", "\u016D", "\u016F", "\u0171", "\u0173", "\u01B0", "\u01D4", "\u01D6", "\u01D8", "\u01DA", "\u01DC", "\u0215", "\u0217", "\u0367", "\u07CE", "\u1D58", "\u1D64", "\u1E73", "\u1E75", "\u1E77", "\u1E79", "\u1E7B", "\u1EE5", "\u1EE7", "\u1EE9", "\u1EEB", "\u1EED", "\u1EEF", "\u1EF1", "\uFF55"],
    "U": ["U", "\xD9", "\xDA", "\xDB", "\xDC", "\u0168", "\u016A", "\u016C", "\u016E", "\u0170", "\u0172", "\u01AF", "\u01D3", "\u01D5", "\u01D7", "\u01D9", "\u01DB", "\u0214", "\u0216", "\u0244", "\u1D1C", "\u1D41", "\u1D7E", "\u1E72", "\u1E74", "\u1E76", "\u1E78", "\u1E7A", "\u1EE4", "\u1EE6", "\u1EE8", "\u1EEA", "\u1EEC", "\u1EEE", "\u1EF0", "\uFF35"],
    "v": ["v", "\u028B", "\u036E", "\u1D5B", "\u1D65", "\u1DB9", "\u1E7D", "\u1E7F", "\u2C71", "\uFF56", "\u2C74"],
    "V": ["V", "\u01B2", "\u0245", "\u028C", "\u1D20", "\u1D8C", "\u1E7C", "\u1E7E", "\uFF36"],
    "w": ["w", "\u0175", "\u02B7", "\u1D42", "\u1E81", "\u1E83", "\u1E85", "\u1E87", "\u1E89", "\u1E98", "\u2C73", "\uFF57"],
    "W": ["W", "\u0174", "\u028D", "\u1D21", "\u1E80", "\u1E82", "\u1E84", "\u1E86", "\u1E88", "\u2C72", "\uFF37"],
    "x": ["x", "\u033D", "\u0353", "\u1D8D", "\u036F", "\u1E8B", "\u1E8D", "\u2093", "\uFF58"],
    "X": ["X", "\u02E3", "\u036F", "\u1E8A", "\u1E8C", "\u2612", "\u2715", "\u2716", "\u2717", "\u2718", "\uFF38"],
    "y": ["y", "\xFD", "\xFF", "\u0177", "\u0233", "\u024F", "\u02B8", "\u1E8F", "\u1EF3", "\u1EF5", "\u1EF7", "\u1EF9", "\uFF59"],
    "Y": ["Y", "\xDD", "\u0176", "\u0178", "\u01B3", "\u01B4", "\u0232", "\u024E", "\u028E", "\u028F", "\u1E8E", "\u1EF2", "\u1EF4", "\u1EF6", "\u1EF8", "\uFF39"],
    "z": ["z", "\u017A", "\u017C", "\u017E", "\u01B6", "\u0225", "\u0240", "\u0290", "\u0291", "\u1646", "\u1647", "\u1DBB", "\u1DBC", "\u1DBD", "\u1E91", "\u1E93", "\u1E95", "\u2C6C", "\uFF5A"],
    "Z": ["Z", "\u0179", "\u017B", "\u017D", "\u01B5", "\u0224", "\u1D22", "\u1D76", "\u1E90", "\u1E92", "\u1E94", "\u2C6B", "\uFF3A"]
  };
  var diacriticless = function(text) {
    var result = [];
    for (var i = 0; i < text.length; i++) {
      var searchChar = text.charAt(i);
      var foundChar = false;
      for (var key in diacritics) {
        var indexChar = diacritics[key].indexOf(searchChar);
        if (indexChar !== -1) {
          result.push(key);
          foundChar = true;
          break;
        }
      }
      if (!foundChar) {
        result.push(searchChar);
      }
    }
    return result.join("");
  };
  var escapeRegExp = function escapeRegExp2(str) {
    return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  var defaultType = {
    format: function format2(x) {
      return x;
    },
    filterPredicate: function filterPredicate(rowval, filter) {
      var skipDiacritics = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var fromDropdown = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (typeof rowval === "undefined" || rowval === null) {
        return false;
      }
      var rowValue = skipDiacritics ? String(rowval).toLowerCase() : diacriticless(escapeRegExp(String(rowval)).toLowerCase());
      var searchTerm = skipDiacritics ? filter.toLowerCase() : diacriticless(escapeRegExp(filter).toLowerCase());
      return fromDropdown ? rowValue === searchTerm : rowValue.indexOf(searchTerm) > -1;
    },
    compare: function compare(x, y) {
      function cook(d) {
        if (typeof d === "undefined" || d === null)
          return "";
        return diacriticless(d.toLowerCase());
      }
      x = cook(x);
      y = cook(y);
      if (x < y)
        return -1;
      if (x > y)
        return 1;
      return 0;
    }
  };
  var script = {
    name: "VgtPaginationPageInfo",
    props: {
      currentPage: {
        "default": 1
      },
      lastPage: {
        "default": 1
      },
      totalRecords: {
        "default": 0
      },
      ofText: {
        "default": "of",
        type: String
      },
      pageText: {
        "default": "page",
        type: String
      }
    },
    data: function data() {
      return {};
    },
    computed: {
      pageInfo: function pageInfo() {
        return "".concat(this.ofText, " ").concat(this.lastPage);
      }
    },
    methods: {
      changePage: function changePage(event) {
        var value = parseInt(event.target.value, 10);
        //! invalid number
        if (Number.isNaN(value) || value > this.lastPage || value < 1) {
          event.target.value = this.currentPage;
          return false;
        }
        event.target.value = value;
        this.$emit("page-changed", value);
      }
    },
    mounted: function mounted() {
    },
    components: {}
  };
  function normalizeComponent$1(template, style, script2, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== "boolean") {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    }
    const options = typeof script2 === "function" ? script2.options : script2;
    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true;
      if (isFunctionalTemplate) {
        options.functional = true;
      }
    }
    if (scopeId) {
      options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (style) {
          style.call(this, createInjectorSSR(context));
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function(context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function(context) {
        style.call(this, createInjector(context));
      };
    }
    if (hook) {
      if (options.functional) {
        const originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        const existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return script2;
  }
  var __vue_script__ = script;
  var __vue_render__ = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "footer__navigation__page-info"
    }, [_vm._v("\n  " + _vm._s(_vm.pageText) + " "), _c("input", {
      staticClass: "footer__navigation__page-info__current-entry",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.currentPage
      },
      on: {
        "keyup": function keyup($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }
          $event.stopPropagation();
          return _vm.changePage($event);
        }
      }
    }), _vm._v(" " + _vm._s(_vm.pageInfo) + "\n")]);
  };
  var __vue_staticRenderFns__ = [];
  var __vue_inject_styles__ = void 0;
  var __vue_scope_id__ = "data-v-9a8cd1f4";
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  var __vue_component__ = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, void 0, void 0, void 0);
  var DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50];
  var script$1 = {
    name: "VgtPagination",
    props: {
      styleClass: {
        "default": "table table-bordered"
      },
      total: {
        "default": null
      },
      perPage: {},
      rtl: {
        "default": false
      },
      customRowsPerPageDropdown: {
        "default": function _default() {
          return [];
        }
      },
      paginateDropdownAllowAll: {
        "default": true
      },
      mode: {
        "default": "records"
      },
      nextText: {
        "default": "Next"
      },
      prevText: {
        "default": "Prev"
      },
      rowsPerPageText: {
        "default": "Rows per page:"
      },
      ofText: {
        "default": "of"
      },
      pageText: {
        "default": "page"
      },
      allText: {
        "default": "All"
      }
    },
    data: function data() {
      return {
        currentPage: 1,
        prevPage: 0,
        currentPerPage: 10,
        rowsPerPageOptions: []
      };
    },
    watch: {
      perPage: {
        handler: function handler(newValue, oldValue) {
          this.handlePerPage();
          this.perPageChanged(oldValue);
        },
        immediate: true
      },
      customRowsPerPageDropdown: function customRowsPerPageDropdown() {
        this.handlePerPage();
      },
      total: {
        handler: function handler(newValue, oldValue) {
          if (this.rowsPerPageOptions.indexOf(this.currentPerPage) === -1) {
            this.currentPerPage = newValue;
          }
        }
      }
    },
    computed: {
      pagesCount: function pagesCount() {
        var quotient = Math.floor(this.total / this.currentPerPage);
        var remainder = this.total % this.currentPerPage;
        return remainder === 0 ? quotient : quotient + 1;
      },
      paginatedInfo: function paginatedInfo() {
        var first = (this.currentPage - 1) * this.currentPerPage + 1;
        var last = Math.min(this.total, this.currentPage * this.currentPerPage);
        if (last === 0) {
          first = 0;
        }
        return "".concat(first, " - ").concat(last, " ").concat(this.ofText, " ").concat(this.total);
      },
      nextIsPossible: function nextIsPossible() {
        return this.currentPage < this.pagesCount;
      },
      prevIsPossible: function prevIsPossible() {
        return this.currentPage > 1;
      }
    },
    methods: {
      changePage: function changePage(pageNumber) {
        var emit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
          this.prevPage = this.currentPage;
          this.currentPage = pageNumber;
          if (emit)
            this.pageChanged();
        }
      },
      nextPage: function nextPage() {
        if (this.nextIsPossible) {
          this.prevPage = this.currentPage;
          ++this.currentPage;
          this.pageChanged();
        }
      },
      previousPage: function previousPage() {
        if (this.prevIsPossible) {
          this.prevPage = this.currentPage;
          --this.currentPage;
          this.pageChanged();
        }
      },
      pageChanged: function pageChanged() {
        this.$emit("page-changed", {
          currentPage: this.currentPage,
          prevPage: this.prevPage
        });
      },
      perPageChanged: function perPageChanged(oldValue) {
        if (oldValue) {
          this.$emit("per-page-changed", {
            currentPerPage: this.currentPerPage
          });
        }
        this.changePage(1, false);
      },
      handlePerPage: function handlePerPage() {
        if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0) {
          this.rowsPerPageOptions = lodash_clonedeep(this.customRowsPerPageDropdown);
        } else {
          this.rowsPerPageOptions = lodash_clonedeep(DEFAULT_ROWS_PER_PAGE_DROPDOWN);
        }
        if (this.perPage) {
          this.currentPerPage = this.perPage;
          var found = false;
          for (var i = 0; i < this.rowsPerPageOptions.length; i++) {
            if (this.rowsPerPageOptions[i] === this.perPage) {
              found = true;
            }
          }
          if (!found && this.perPage !== -1) {
            this.rowsPerPageOptions.unshift(this.perPage);
          }
        } else {
          this.currentPerPage = 10;
        }
      }
    },
    mounted: function mounted() {
    },
    components: {
      "pagination-page-info": __vue_component__
    }
  };
  var __vue_script__$1 = script$1;
  var __vue_render__$1 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "vgt-wrap__footer vgt-clearfix"
    }, [_c("div", {
      staticClass: "footer__row-count vgt-pull-left"
    }, [_c("span", {
      staticClass: "footer__row-count__label"
    }, [_vm._v(_vm._s(_vm.rowsPerPageText))]), _vm._v(" "), _c("select", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.currentPerPage,
        expression: "currentPerPage"
      }],
      staticClass: "footer__row-count__select",
      attrs: {
        "autocomplete": "off",
        "name": "perPageSelect"
      },
      on: {
        "change": [function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected;
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.currentPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }, _vm.perPageChanged]
      }
    }, [_vm._l(_vm.rowsPerPageOptions, function(option, idx) {
      return _c("option", {
        key: "rows-dropdown-option-" + idx,
        domProps: {
          "value": option
        }
      }, [_vm._v("\n        " + _vm._s(option) + "\n      ")]);
    }), _vm._v(" "), _vm.paginateDropdownAllowAll ? _c("option", {
      domProps: {
        "value": _vm.total
      }
    }, [_vm._v(_vm._s(_vm.allText))]) : _vm._e()], 2)]), _vm._v(" "), _c("div", {
      staticClass: "footer__navigation vgt-pull-right"
    }, [_c("a", {
      staticClass: "footer__navigation__page-btn",
      "class": {
        disabled: !_vm.prevIsPossible
      },
      attrs: {
        "href": "javascript:undefined",
        "tabindex": "0"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.previousPage($event);
        }
      }
    }, [_c("span", {
      staticClass: "chevron",
      "class": {
        "left": !_vm.rtl,
        "right": _vm.rtl
      }
    }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.prevText))])]), _vm._v(" "), _vm.mode === "pages" ? _c("pagination-page-info", {
      attrs: {
        "totalRecords": _vm.total,
        "lastPage": _vm.pagesCount,
        "currentPage": _vm.currentPage,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText
      },
      on: {
        "page-changed": _vm.changePage
      }
    }) : _c("div", {
      staticClass: "footer__navigation__info"
    }, [_vm._v(_vm._s(_vm.paginatedInfo))]), _vm._v(" "), _c("a", {
      staticClass: "footer__navigation__page-btn",
      "class": {
        disabled: !_vm.nextIsPossible
      },
      attrs: {
        "href": "javascript:undefined",
        "tabindex": "0"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.nextPage($event);
        }
      }
    }, [_c("span", [_vm._v(_vm._s(_vm.nextText))]), _vm._v(" "), _c("span", {
      staticClass: "chevron",
      "class": {
        "right": !_vm.rtl,
        "left": _vm.rtl
      }
    })])], 1)]);
  };
  var __vue_staticRenderFns__$1 = [];
  var __vue_inject_styles__$1 = void 0;
  var __vue_scope_id__$1 = void 0;
  var __vue_module_identifier__$1 = void 0;
  var __vue_is_functional_template__$1 = false;
  var __vue_component__$1 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, void 0, void 0, void 0);
  var script$2 = {
    name: "VgtGlobalSearch",
    props: ["value", "searchEnabled", "globalSearchPlaceholder"],
    data: function data() {
      return {
        globalSearchTerm: null
      };
    },
    computed: {
      showControlBar: function showControlBar() {
        if (this.searchEnabled)
          return true;
        if (this.$slots && this.$slots["internal-table-actions"])
          return true;
        return false;
      }
    },
    methods: {
      updateValue: function updateValue(value) {
        this.$emit("input", value);
        this.$emit("on-keyup", value);
      },
      entered: function entered(value) {
        this.$emit("on-enter", value);
      }
    }
  };
  var __vue_script__$2 = script$2;
  var __vue_render__$2 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.showControlBar ? _c("div", {
      staticClass: "vgt-global-search vgt-clearfix"
    }, [_c("div", {
      staticClass: "vgt-global-search__input vgt-pull-left"
    }, [_vm.searchEnabled ? _c("span", {
      staticClass: "input__icon"
    }, [_c("div", {
      staticClass: "magnifying-glass"
    })]) : _vm._e(), _vm._v(" "), _vm.searchEnabled ? _c("input", {
      staticClass: "vgt-input vgt-pull-left",
      attrs: {
        "type": "text",
        "placeholder": _vm.globalSearchPlaceholder
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          return _vm.updateValue($event.target.value);
        },
        "keyup": function keyup($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }
          return _vm.entered($event.target.value);
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c("div", {
      staticClass: "vgt-global-search__actions vgt-pull-right"
    }, [_vm._t("internal-table-actions")], 2)]) : _vm._e();
  };
  var __vue_staticRenderFns__$2 = [];
  var __vue_inject_styles__$2 = void 0;
  var __vue_scope_id__$2 = void 0;
  var __vue_module_identifier__$2 = void 0;
  var __vue_is_functional_template__$2 = false;
  var __vue_component__$2 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, void 0, void 0, void 0);
  var script$3 = {
    name: "VgtFilterRow",
    props: ["lineNumbers", "columns", "typedColumns", "globalSearchEnabled", "selectable", "mode"],
    watch: {
      columns: {
        handler: function handler(newValue, oldValue) {
          this.populateInitialFilters();
        },
        deep: true,
        immediate: true
      }
    },
    data: function data() {
      return {
        columnFilters: {},
        timer: null
      };
    },
    computed: {
      hasFilterRow: function hasFilterRow() {
        for (var i = 0; i < this.columns.length; i++) {
          var col = this.columns[i];
          if (col.filterOptions && col.filterOptions.enabled) {
            return true;
          }
        }
        return false;
      }
    },
    methods: {
      reset: function reset() {
        var emitEvent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        this.columnFilters = {};
        if (emitEvent) {
          this.$emit("filter-changed", this.columnFilters);
        }
      },
      isFilterable: function isFilterable(column) {
        return column.filterOptions && column.filterOptions.enabled;
      },
      isDropdown: function isDropdown(column) {
        return this.isFilterable(column) && column.filterOptions.filterDropdownItems && column.filterOptions.filterDropdownItems.length;
      },
      isDropdownObjects: function isDropdownObjects(column) {
        return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) === "object";
      },
      isDropdownArray: function isDropdownArray(column) {
        return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) !== "object";
      },
      getPlaceholder: function getPlaceholder(column) {
        var placeholder = this.isFilterable(column) && column.filterOptions.placeholder || "Filter ".concat(column.label);
        return placeholder;
      },
      updateFiltersOnEnter: function updateFiltersOnEnter(column, value) {
        if (this.timer)
          clearTimeout(this.timer);
        this.updateFiltersImmediately(column.field, value);
      },
      updateFiltersOnKeyup: function updateFiltersOnKeyup(column, value) {
        if (column.filterOptions.trigger === "enter")
          return;
        this.updateFilters(column, value);
      },
      updateSlotFilter: function updateSlotFilter(column, value) {
        var fieldToFilter = column.filterOptions.slotFilterField || column.field;
        if (typeof column.filterOptions.formatValue === "function") {
          value = column.filterOptions.formatValue(value);
        }
        this.updateFiltersImmediately(fieldToFilter, value);
      },
      updateFilters: function updateFilters(column, value) {
        var _this = this;
        if (this.timer)
          clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          _this.updateFiltersImmediately(column.field, value);
        }, 400);
      },
      updateFiltersImmediately: function updateFiltersImmediately(field, value) {
        this.$set(this.columnFilters, field, value);
        this.$emit("filter-changed", this.columnFilters);
      },
      populateInitialFilters: function populateInitialFilters() {
        for (var i = 0; i < this.columns.length; i++) {
          var col = this.columns[i];
          if (this.isFilterable(col) && typeof col.filterOptions.filterValue !== "undefined" && col.filterOptions.filterValue !== null) {
            this.$set(this.columnFilters, col.field, col.filterOptions.filterValue);
          }
        }
        this.$emit("filter-changed", this.columnFilters);
      }
    }
  };
  var __vue_script__$3 = script$3;
  var __vue_render__$3 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.hasFilterRow ? _c("tr", [_vm.lineNumbers ? _c("th") : _vm._e(), _vm._v(" "), _vm.selectable ? _c("th") : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function(column, index2) {
      return !column.hidden ? _c("th", {
        key: index2,
        staticClass: "filter-th"
      }, [_vm._t("column-filter", [_vm.isFilterable(column) ? _c("div", [!_vm.isDropdown(column) ? _c("input", {
        staticClass: "vgt-input",
        attrs: {
          "type": "text",
          "placeholder": _vm.getPlaceholder(column)
        },
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "keyup": function keyup($event) {
            if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }
            return _vm.updateFiltersOnEnter(column, $event.target.value);
          },
          "input": function input($event) {
            return _vm.updateFiltersOnKeyup(column, $event.target.value);
          }
        }
      }) : _vm._e(), _vm._v(" "), _vm.isDropdownArray(column) ? _c("select", {
        staticClass: "vgt-select",
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "change": function change($event) {
            return _vm.updateFilters(column, $event.target.value);
          }
        }
      }, [_c("option", {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function(option, i) {
        return _c("option", {
          key: i,
          domProps: {
            "value": option
          }
        }, [_vm._v("\n              " + _vm._s(option) + "\n            ")]);
      })], 2) : _vm._e(), _vm._v(" "), _vm.isDropdownObjects(column) ? _c("select", {
        staticClass: "vgt-select",
        domProps: {
          "value": _vm.columnFilters[column.field]
        },
        on: {
          "change": function change($event) {
            return _vm.updateFilters(column, $event.target.value, true);
          }
        }
      }, [_c("option", {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function(option, i) {
        return _c("option", {
          key: i,
          domProps: {
            "value": option.value
          }
        }, [_vm._v(_vm._s(option.text))]);
      })], 2) : _vm._e()]) : _vm._e()], {
        "column": column,
        "updateFilters": _vm.updateSlotFilter
      })], 2) : _vm._e();
    })], 2) : _vm._e();
  };
  var __vue_staticRenderFns__$3 = [];
  var __vue_inject_styles__$3 = void 0;
  var __vue_scope_id__$3 = "data-v-1c6bfd21";
  var __vue_module_identifier__$3 = void 0;
  var __vue_is_functional_template__$3 = false;
  var __vue_component__$3 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, void 0, void 0, void 0);
  var DEFAULT_SORT_TYPE = "asc";
  function getColumnFirstSortType(column) {
    return column.firstSortType || DEFAULT_SORT_TYPE;
  }
  function getCurrentPrimarySort(sortArray, column) {
    return sortArray.length === 1 && sortArray[0].field === column.field ? sortArray[0].type : void 0;
  }
  function getNextSort(currentSort) {
    return currentSort === "asc" ? "desc" : DEFAULT_SORT_TYPE;
  }
  function getIndex(sortArray, column) {
    for (var i = 0; i < sortArray.length; i++) {
      if (column.field === sortArray[i].field)
        return i;
    }
    return -1;
  }
  var primarySort = function(sortArray, column) {
    var currentPrimarySort = getCurrentPrimarySort(sortArray, column);
    return [{
      field: column.field,
      type: currentPrimarySort ? getNextSort(currentPrimarySort) : getColumnFirstSortType(column)
    }];
  };
  var secondarySort = function(sortArray, column) {
    var index2 = getIndex(sortArray, column);
    if (index2 === -1) {
      sortArray.push({
        field: column.field,
        type: getColumnFirstSortType(column)
      });
    } else {
      sortArray[index2].type = getNextSort(sortArray[index2].type);
    }
    return sortArray;
  };
  var script$4 = {
    name: "VgtTableHeader",
    props: {
      lineNumbers: {
        "default": false,
        type: Boolean
      },
      selectable: {
        "default": false,
        type: Boolean
      },
      allSelected: {
        "default": false,
        type: Boolean
      },
      allSelectedIndeterminate: {
        "default": false,
        type: Boolean
      },
      columns: {
        type: Array
      },
      mode: {
        type: String
      },
      typedColumns: {},
      sortable: {
        type: Boolean
      },
      getClasses: {
        type: Function
      },
      searchEnabled: {
        type: Boolean
      },
      tableRef: {},
      paginated: {}
    },
    watch: {
      columns: {
        handler: function handler() {
          this.setColumnStyles();
        },
        immediate: true
      },
      tableRef: {
        handler: function handler() {
          this.setColumnStyles();
        },
        immediate: true
      },
      paginated: {
        handler: function handler() {
          if (this.tableRef) {
            this.setColumnStyles();
          }
        },
        deep: true
      }
    },
    data: function data() {
      return {
        checkBoxThStyle: {},
        lineNumberThStyle: {},
        columnStyles: [],
        sorts: [],
        ro: null
      };
    },
    computed: {},
    methods: {
      reset: function reset() {
        this.$refs["filter-row"].reset(true);
      },
      toggleSelectAll: function toggleSelectAll() {
        this.$emit("on-toggle-select-all");
      },
      isSortableColumn: function isSortableColumn(column) {
        var sortable = column.sortable;
        var isSortable = typeof sortable === "boolean" ? sortable : this.sortable;
        return isSortable;
      },
      sort: function sort(e, column) {
        if (!this.isSortableColumn(column))
          return;
        if (e.shiftKey) {
          this.sorts = secondarySort(this.sorts, column);
        } else {
          this.sorts = primarySort(this.sorts, column);
        }
        this.$emit("on-sort-change", this.sorts);
      },
      setInitialSort: function setInitialSort(sorts) {
        this.sorts = sorts;
        this.$emit("on-sort-change", this.sorts);
      },
      getColumnSort: function getColumnSort(column) {
        for (var i = 0; i < this.sorts.length; i += 1) {
          if (this.sorts[i].field === column.field) {
            return this.sorts[i].type || "asc";
          }
        }
        return null;
      },
      getHeaderClasses: function getHeaderClasses(column, index2) {
        var classes = lodash_assign({}, this.getClasses(index2, "th"), {
          sortable: this.isSortableColumn(column),
          "sorting sorting-desc": this.getColumnSort(column) === "desc",
          "sorting sorting-asc": this.getColumnSort(column) === "asc"
        });
        return classes;
      },
      filterRows: function filterRows(columnFilters) {
        this.$emit("filter-changed", columnFilters);
      },
      getWidthStyle: function getWidthStyle(dom) {
        if (window && window.getComputedStyle && dom) {
          var cellStyle = window.getComputedStyle(dom, null);
          return {
            width: cellStyle.width
          };
        }
        return {
          width: "auto"
        };
      },
      setColumnStyles: function setColumnStyles() {
        var colStyles = [];
        for (var i = 0; i < this.columns.length; i++) {
          if (this.tableRef) {
            var skip = 0;
            if (this.selectable)
              skip++;
            if (this.lineNumbers)
              skip++;
            var cell = this.tableRef.rows[0].cells[i + skip];
            colStyles.push(this.getWidthStyle(cell));
          } else {
            colStyles.push({
              minWidth: this.columns[i].width ? this.columns[i].width : "auto",
              maxWidth: this.columns[i].width ? this.columns[i].width : "auto",
              width: this.columns[i].width ? this.columns[i].width : "auto"
            });
          }
        }
        this.columnStyles = colStyles;
      },
      getColumnStyle: function getColumnStyle(column, index2) {
        var styleObject = {
          minWidth: column.width ? column.width : "auto",
          maxWidth: column.width ? column.width : "auto",
          width: column.width ? column.width : "auto"
        };
        if (this.tableRef) {
          if (this.selectable)
            index2++;
          if (this.lineNumbers)
            index2++;
          var cell = this.tableRef.rows[0].cells[index2];
          var cellStyle = window.getComputedStyle(cell, null);
          styleObject.width = cellStyle.width;
        }
        return styleObject;
      }
    },
    mounted: function mounted() {
      var _this = this;
      this.$nextTick(function() {
        _this.ro = new ResizeObserver(function() {
          _this.setColumnStyles();
        });
        _this.ro.observe(_this.$parent.$el);
        if (_this.tableRef) {
          Array.from(_this.$parent.$refs["table-header-primary"].$el.children[0].children).forEach(function(header) {
            _this.ro.observe(header);
          });
        }
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.ro.disconnect();
    },
    components: {
      "vgt-filter-row": __vue_component__$3
    }
  };
  var __vue_script__$4 = script$4;
  var __vue_render__$4 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("thead", [_c("tr", [_vm.lineNumbers ? _c("th", {
      staticClass: "line-numbers"
    }) : _vm._e(), _vm._v(" "), _vm.selectable ? _c("th", {
      staticClass: "vgt-checkbox-col"
    }, [_c("input", {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected,
        "indeterminate": _vm.allSelectedIndeterminate
      },
      on: {
        "change": _vm.toggleSelectAll
      }
    })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function(column, index2) {
      return !column.hidden ? _c("th", {
        key: index2,
        "class": _vm.getHeaderClasses(column, index2),
        style: _vm.columnStyles[index2],
        on: {
          "click": function click($event) {
            return _vm.sort($event, column);
          }
        }
      }, [_vm._t("table-column", [_c("span", [_vm._v(_vm._s(column.label))])], {
        "column": column
      })], 2) : _vm._e();
    })], 2), _vm._v(" "), _c("vgt-filter-row", {
      ref: "filter-row",
      tag: "tr",
      attrs: {
        "global-search-enabled": _vm.searchEnabled,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "columns": _vm.columns,
        "mode": _vm.mode,
        "typed-columns": _vm.typedColumns
      },
      on: {
        "filter-changed": _vm.filterRows
      },
      scopedSlots: _vm._u([{
        key: "column-filter",
        fn: function fn(props) {
          return [_vm._t("column-filter", null, {
            "column": props.column,
            "updateFilters": props.updateFilters
          })];
        }
      }], null, true)
    })], 1);
  };
  var __vue_staticRenderFns__$4 = [];
  var __vue_inject_styles__$4 = void 0;
  var __vue_scope_id__$4 = void 0;
  var __vue_module_identifier__$4 = void 0;
  var __vue_is_functional_template__$4 = false;
  var __vue_component__$4 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, void 0, void 0, void 0);
  var script$5 = {
    name: "VgtHeaderRow",
    props: {
      headerRow: {
        type: Object
      },
      columns: {
        type: Array
      },
      lineNumbers: {
        type: Boolean
      },
      selectable: {
        type: Boolean
      },
      selectAllByGroup: {
        type: Boolean
      },
      collapsable: {
        type: [Boolean, Number],
        "default": false
      },
      collectFormatted: {
        type: Function
      },
      formattedRow: {
        type: Function
      },
      getClasses: {
        type: Function
      },
      fullColspan: {
        type: Number
      },
      groupIndex: {
        type: Number
      }
    },
    data: function data() {
      return {};
    },
    computed: {
      allSelected: function allSelected() {
        var headerRow = this.headerRow;
        this.groupChildObject;
        return headerRow.children.filter(function(row) {
          return row.vgtSelected;
        }).length === headerRow.children.length;
      }
    },
    methods: {
      columnCollapsable: function columnCollapsable(currentIndex) {
        if (this.collapsable === true) {
          return currentIndex === 0;
        }
        return currentIndex === this.collapsable;
      },
      toggleSelectGroup: function toggleSelectGroup(event) {
        this.$emit("on-select-group-change", {
          groupIndex: this.groupIndex,
          checked: event.target.checked
        });
      }
    },
    mounted: function mounted() {
    },
    components: {}
  };
  var __vue_script__$5 = script$5;
  var __vue_render__$5 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("tr", [_vm.headerRow.mode === "span" ? _c("th", {
      staticClass: "vgt-left-align vgt-row-header",
      attrs: {
        "colspan": _vm.fullColspan
      }
    }, [_vm.selectAllByGroup ? [_vm._t("table-header-group-select", [_c("input", {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected
      },
      on: {
        "change": function change($event) {
          return _vm.toggleSelectGroup($event);
        }
      }
    })], {
      "columns": _vm.columns,
      "row": _vm.headerRow
    })] : _vm._e(), _vm._v(" "), _c("span", {
      on: {
        "click": function click($event) {
          _vm.collapsable ? _vm.$emit("vgtExpand", !_vm.headerRow.vgtIsExpanded) : function() {
          };
        }
      }
    }, [_vm.collapsable ? _c("span", {
      staticClass: "triangle",
      "class": {
        "expand": _vm.headerRow.vgtIsExpanded
      }
    }) : _vm._e(), _vm._v(" "), _vm._t("table-header-row", [_vm.headerRow.html ? _c("span", {
      domProps: {
        "innerHTML": _vm._s(_vm.headerRow.label)
      }
    }) : _c("span", [_vm._v("\n          " + _vm._s(_vm.headerRow.label) + "\n        ")])], {
      "row": _vm.headerRow
    })], 2)], 2) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== "span" && _vm.lineNumbers ? _c("th", {
      staticClass: "vgt-row-header"
    }) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== "span" && _vm.selectable ? _c("th", {
      staticClass: "vgt-row-header"
    }, [_vm.selectAllByGroup ? [_vm._t("table-header-group-select", [_c("input", {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected
      },
      on: {
        "change": function change($event) {
          return _vm.toggleSelectGroup($event);
        }
      }
    })], {
      "columns": _vm.columns,
      "row": _vm.headerRow
    })] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function(column, i) {
      return _vm.headerRow.mode !== "span" && !column.hidden ? _c("th", {
        key: i,
        staticClass: "vgt-row-header",
        "class": _vm.getClasses(i, "td"),
        on: {
          "click": function click($event) {
            _vm.columnCollapsable(i) ? _vm.$emit("vgtExpand", !_vm.headerRow.vgtIsExpanded) : function() {
            };
          }
        }
      }, [_vm.columnCollapsable(i) ? _c("span", {
        staticClass: "triangle",
        "class": {
          "expand": _vm.headerRow.vgtIsExpanded
        }
      }) : _vm._e(), _vm._v(" "), _vm._t("table-header-row", [!column.html ? _c("span", [_vm._v("\n        " + _vm._s(_vm.collectFormatted(_vm.headerRow, column, true)) + "\n      ")]) : _vm._e(), _vm._v(" "), column.html ? _c("span", {
        domProps: {
          "innerHTML": _vm._s(_vm.collectFormatted(_vm.headerRow, column, true))
        }
      }) : _vm._e()], {
        "row": _vm.headerRow,
        "column": column,
        "formattedRow": _vm.formattedRow(_vm.headerRow, true)
      })], 2) : _vm._e();
    })], 2);
  };
  var __vue_staticRenderFns__$5 = [];
  var __vue_inject_styles__$5 = void 0;
  var __vue_scope_id__$5 = void 0;
  var __vue_module_identifier__$5 = void 0;
  var __vue_is_functional_template__$5 = false;
  var __vue_component__$5 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, void 0, void 0, void 0);
  function toDate(argument) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number2 = Number(dirtyNumber);
    if (isNaN(number2)) {
      return number2;
    }
    return number2 < 0 ? Math.ceil(number2) : Math.floor(number2);
  }
  function addMilliseconds(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var timestamp = toDate(dirtyDate).getTime();
    var amount = toInteger(dirtyAmount);
    return new Date(timestamp + amount);
  }
  var MILLISECONDS_IN_MINUTE = 6e4;
  function getTimezoneOffsetInMilliseconds(dirtyDate) {
    var date2 = new Date(dirtyDate.getTime());
    var baseTimezoneOffset = date2.getTimezoneOffset();
    date2.setSeconds(0, 0);
    var millisecondsPartOfTimezoneOffset = date2.getTime() % MILLISECONDS_IN_MINUTE;
    return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
  }
  function compareAsc(dirtyDateLeft, dirtyDateRight) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var dateLeft = toDate(dirtyDateLeft);
    var dateRight = toDate(dirtyDateRight);
    var diff = dateLeft.getTime() - dateRight.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }
  function isValid(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    return !isNaN(date2);
  }
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  function formatDistance(token, count, options) {
    options = options || {};
    var result;
    if (typeof formatDistanceLocale[token] === "string") {
      result = formatDistanceLocale[token];
    } else if (count === 1) {
      result = formatDistanceLocale[token].one;
    } else {
      result = formatDistanceLocale[token].other.replace("{{count}}", count);
    }
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  }
  function buildFormatLongFn(args) {
    return function(dirtyOptions) {
      var options = dirtyOptions || {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  }
  function buildLocalizeFn(args) {
    return function(dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index2 = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index2];
    };
  }
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  var dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  function ordinalNumber(dirtyNumber, _dirtyOptions) {
    var number2 = Number(dirtyNumber);
    var rem100 = number2 % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number2 + "st";
        case 2:
          return number2 + "nd";
        case 3:
          return number2 + "rd";
      }
    }
    return number2 + "th";
  }
  var localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: function(quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  function buildMatchPatternFn(args) {
    return function(dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult) {
        return null;
      }
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value,
        rest: string.slice(matchedString.length)
      };
    };
  }
  function buildMatchFn(args) {
    return function(dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var value;
      if (Object.prototype.toString.call(parsePatterns) === "[object Array]") {
        value = parsePatterns.findIndex(function(pattern) {
          return pattern.test(string);
        });
      } else {
        value = findKey(parsePatterns, function(pattern) {
          return pattern.test(string);
        });
      }
      value = args.valueCallback ? args.valueCallback(value) : value;
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value,
        rest: string.slice(matchedString.length)
      };
    };
  }
  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
  }
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: function(index2) {
        return index2 + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  var locale = {
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  function subMilliseconds(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var amount = toInteger(dirtyAmount);
    return addMilliseconds(dirtyDate, -amount);
  }
  function addLeadingZeros(number2, targetLength) {
    var sign = number2 < 0 ? "-" : "";
    var output = Math.abs(number2).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }
  var formatters = {
    y: function(date2, token) {
      var signedYear = date2.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
    },
    M: function(date2, token) {
      var month = date2.getUTCMonth();
      return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    d: function(date2, token) {
      return addLeadingZeros(date2.getUTCDate(), token.length);
    },
    a: function(date2, token) {
      var dayPeriodEnumValue = date2.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaaaa":
          return dayPeriodEnumValue[0];
        case "aaaa":
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    h: function(date2, token) {
      return addLeadingZeros(date2.getUTCHours() % 12 || 12, token.length);
    },
    H: function(date2, token) {
      return addLeadingZeros(date2.getUTCHours(), token.length);
    },
    m: function(date2, token) {
      return addLeadingZeros(date2.getUTCMinutes(), token.length);
    },
    s: function(date2, token) {
      return addLeadingZeros(date2.getUTCSeconds(), token.length);
    },
    S: function(date2, token) {
      var numberOfDigits = token.length;
      var milliseconds = date2.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };
  var MILLISECONDS_IN_DAY = 864e5;
  function getUTCDayOfYear(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var timestamp = date2.getTime();
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date2.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
  }
  function startOfUTCISOWeek(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var weekStartsOn = 1;
    var date2 = toDate(dirtyDate);
    var day = date2.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date2.setUTCDate(date2.getUTCDate() - diff);
    date2.setUTCHours(0, 0, 0, 0);
    return date2;
  }
  function getUTCISOWeekYear(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var year = date2.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
    if (date2.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date2.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function startOfUTCISOWeekYear(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var year = getUTCISOWeekYear(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date2 = startOfUTCISOWeek(fourthOfJanuary);
    return date2;
  }
  var MILLISECONDS_IN_WEEK = 6048e5;
  function getUTCISOWeek(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var diff = startOfUTCISOWeek(date2).getTime() - startOfUTCISOWeekYear(date2).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }
  function startOfUTCWeek(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var options = dirtyOptions || {};
    var locale2 = options.locale;
    var localeWeekStartsOn = locale2 && locale2.options && locale2.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date2 = toDate(dirtyDate);
    var day = date2.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date2.setUTCDate(date2.getUTCDate() - diff);
    date2.setUTCHours(0, 0, 0, 0);
    return date2;
  }
  function getUTCWeekYear(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate, dirtyOptions);
    var year = date2.getUTCFullYear();
    var options = dirtyOptions || {};
    var locale2 = options.locale;
    var localeFirstWeekContainsDate = locale2 && locale2.options && locale2.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);
    if (date2.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date2.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var options = dirtyOptions || {};
    var locale2 = options.locale;
    var localeFirstWeekContainsDate = locale2 && locale2.options && locale2.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
    var year = getUTCWeekYear(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date2 = startOfUTCWeek(firstWeek, dirtyOptions);
    return date2;
  }
  var MILLISECONDS_IN_WEEK$1 = 6048e5;
  function getUTCWeek(dirtyDate, options) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var diff = startOfUTCWeek(date2, options).getTime() - startOfUTCWeekYear(date2, options).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
  }
  var dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  };
  var formatters$1 = {
    G: function(date2, token, localize2) {
      var era = date2.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return localize2.era(era, {
            width: "abbreviated"
          });
        case "GGGGG":
          return localize2.era(era, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return localize2.era(era, {
            width: "wide"
          });
      }
    },
    y: function(date2, token, localize2) {
      if (token === "yo") {
        var signedYear = date2.getUTCFullYear();
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize2.ordinalNumber(year, {
          unit: "year"
        });
      }
      return formatters.y(date2, token);
    },
    Y: function(date2, token, localize2, options) {
      var signedWeekYear = getUTCWeekYear(date2, options);
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        var twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }
      if (token === "Yo") {
        return localize2.ordinalNumber(weekYear, {
          unit: "year"
        });
      }
      return addLeadingZeros(weekYear, token.length);
    },
    R: function(date2, token) {
      var isoWeekYear = getUTCISOWeekYear(date2);
      return addLeadingZeros(isoWeekYear, token.length);
    },
    u: function(date2, token) {
      var year = date2.getUTCFullYear();
      return addLeadingZeros(year, token.length);
    },
    Q: function(date2, token, localize2) {
      var quarter = Math.ceil((date2.getUTCMonth() + 1) / 3);
      switch (token) {
        case "Q":
          return String(quarter);
        case "QQ":
          return addLeadingZeros(quarter, 2);
        case "Qo":
          return localize2.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "QQQ":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    q: function(date2, token, localize2) {
      var quarter = Math.ceil((date2.getUTCMonth() + 1) / 3);
      switch (token) {
        case "q":
          return String(quarter);
        case "qq":
          return addLeadingZeros(quarter, 2);
        case "qo":
          return localize2.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "qqq":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    M: function(date2, token, localize2) {
      var month = date2.getUTCMonth();
      switch (token) {
        case "M":
        case "MM":
          return formatters.M(date2, token);
        case "Mo":
          return localize2.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "MMM":
          return localize2.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return localize2.month(month, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return localize2.month(month, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    L: function(date2, token, localize2) {
      var month = date2.getUTCMonth();
      switch (token) {
        case "L":
          return String(month + 1);
        case "LL":
          return addLeadingZeros(month + 1, 2);
        case "Lo":
          return localize2.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "LLL":
          return localize2.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return localize2.month(month, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return localize2.month(month, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    w: function(date2, token, localize2, options) {
      var week = getUTCWeek(date2, options);
      if (token === "wo") {
        return localize2.ordinalNumber(week, {
          unit: "week"
        });
      }
      return addLeadingZeros(week, token.length);
    },
    I: function(date2, token, localize2) {
      var isoWeek = getUTCISOWeek(date2);
      if (token === "Io") {
        return localize2.ordinalNumber(isoWeek, {
          unit: "week"
        });
      }
      return addLeadingZeros(isoWeek, token.length);
    },
    d: function(date2, token, localize2) {
      if (token === "do") {
        return localize2.ordinalNumber(date2.getUTCDate(), {
          unit: "date"
        });
      }
      return formatters.d(date2, token);
    },
    D: function(date2, token, localize2) {
      var dayOfYear = getUTCDayOfYear(date2);
      if (token === "Do") {
        return localize2.ordinalNumber(dayOfYear, {
          unit: "dayOfYear"
        });
      }
      return addLeadingZeros(dayOfYear, token.length);
    },
    E: function(date2, token, localize2) {
      var dayOfWeek = date2.getUTCDay();
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    e: function(date2, token, localize2, options) {
      var dayOfWeek = date2.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "e":
          return String(localDayOfWeek);
        case "ee":
          return addLeadingZeros(localDayOfWeek, 2);
        case "eo":
          return localize2.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "eee":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    c: function(date2, token, localize2, options) {
      var dayOfWeek = date2.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "c":
          return String(localDayOfWeek);
        case "cc":
          return addLeadingZeros(localDayOfWeek, token.length);
        case "co":
          return localize2.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "ccc":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    i: function(date2, token, localize2) {
      var dayOfWeek = date2.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        case "i":
          return String(isoDayOfWeek);
        case "ii":
          return addLeadingZeros(isoDayOfWeek, token.length);
        case "io":
          return localize2.ordinalNumber(isoDayOfWeek, {
            unit: "day"
          });
        case "iii":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    a: function(date2, token, localize2) {
      var hours = date2.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaaaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    b: function(date2, token, localize2) {
      var hours = date2.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      }
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbbbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    B: function(date2, token, localize2) {
      var hours = date2.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    h: function(date2, token, localize2) {
      if (token === "ho") {
        var hours = date2.getUTCHours() % 12;
        if (hours === 0)
          hours = 12;
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return formatters.h(date2, token);
    },
    H: function(date2, token, localize2) {
      if (token === "Ho") {
        return localize2.ordinalNumber(date2.getUTCHours(), {
          unit: "hour"
        });
      }
      return formatters.H(date2, token);
    },
    K: function(date2, token, localize2) {
      var hours = date2.getUTCHours() % 12;
      if (token === "Ko") {
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    k: function(date2, token, localize2) {
      var hours = date2.getUTCHours();
      if (hours === 0)
        hours = 24;
      if (token === "ko") {
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    m: function(date2, token, localize2) {
      if (token === "mo") {
        return localize2.ordinalNumber(date2.getUTCMinutes(), {
          unit: "minute"
        });
      }
      return formatters.m(date2, token);
    },
    s: function(date2, token, localize2) {
      if (token === "so") {
        return localize2.ordinalNumber(date2.getUTCSeconds(), {
          unit: "second"
        });
      }
      return formatters.s(date2, token);
    },
    S: function(date2, token) {
      return formatters.S(date2, token);
    },
    X: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timezoneOffset = originalDate.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        case "X":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "XXXX":
        case "XX":
          return formatTimezone(timezoneOffset);
        case "XXXXX":
        case "XXX":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    x: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "x":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "xxxx":
        case "xx":
          return formatTimezone(timezoneOffset);
        case "xxxxx":
        case "xxx":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    O: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "OOOO":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    z: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "zzzz":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    t: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timestamp = Math.floor(originalDate.getTime() / 1e3);
      return addLeadingZeros(timestamp, token.length);
    },
    T: function(date2, token, _localize, options) {
      var originalDate = options._originalDate || date2;
      var timestamp = originalDate.getTime();
      return addLeadingZeros(timestamp, token.length);
    }
  };
  function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimiter = dirtyDelimiter || "";
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, dirtyDelimiter);
  }
  function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || "";
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  function dateLongFormatter(pattern, formatLong2) {
    switch (pattern) {
      case "P":
        return formatLong2.date({
          width: "short"
        });
      case "PP":
        return formatLong2.date({
          width: "medium"
        });
      case "PPP":
        return formatLong2.date({
          width: "long"
        });
      case "PPPP":
      default:
        return formatLong2.date({
          width: "full"
        });
    }
  }
  function timeLongFormatter(pattern, formatLong2) {
    switch (pattern) {
      case "p":
        return formatLong2.time({
          width: "short"
        });
      case "pp":
        return formatLong2.time({
          width: "medium"
        });
      case "ppp":
        return formatLong2.time({
          width: "long"
        });
      case "pppp":
      default:
        return formatLong2.time({
          width: "full"
        });
    }
  }
  function dateTimeLongFormatter(pattern, formatLong2) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong2);
    }
    var dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong2.dateTime({
          width: "short"
        });
        break;
      case "PP":
        dateTimeFormat = formatLong2.dateTime({
          width: "medium"
        });
        break;
      case "PPP":
        dateTimeFormat = formatLong2.dateTime({
          width: "long"
        });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong2.dateTime({
          width: "full"
        });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
  }
  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };
  var protectedDayOfYearTokens = ["D", "DD"];
  var protectedWeekYearTokens = ["YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return protectedDayOfYearTokens.indexOf(token) !== -1;
  }
  function isProtectedWeekYearToken(token) {
    return protectedWeekYearTokens.indexOf(token) !== -1;
  }
  function throwProtectedError(token) {
    if (token === "YYYY") {
      throw new RangeError("Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr");
    } else if (token === "YY") {
      throw new RangeError("Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr");
    } else if (token === "D") {
      throw new RangeError("Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr");
    } else if (token === "DD") {
      throw new RangeError("Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr");
    }
  }
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'(.*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};
    var locale$1 = options.locale || locale;
    var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    if (!locale$1.localize) {
      throw new RangeError("locale must contain localize property");
    }
    if (!locale$1.formatLong) {
      throw new RangeError("locale must contain formatLong property");
    }
    var originalDate = toDate(dirtyDate);
    if (!isValid(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
    var utcDate = subMilliseconds(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale: locale$1,
      _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale$1.formatLong, formatterOptions);
      }
      return substring;
    }).join("").match(formattingTokensRegExp).map(function(substring) {
      if (substring === "''") {
        return "'";
      }
      var firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }
      var formatter = formatters$1[firstCharacter];
      if (formatter) {
        if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
          throwProtectedError(substring);
        }
        if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
          throwProtectedError(substring);
        }
        return formatter(utcDate, substring, locale$1.localize, formatterOptions);
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
      }
      return substring;
    }).join("");
    return result;
  }
  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }
  function assign$1(target, dirtyObject) {
    if (target == null) {
      throw new TypeError("assign requires that input parameter not be null or undefined");
    }
    dirtyObject = dirtyObject || {};
    for (var property in dirtyObject) {
      if (dirtyObject.hasOwnProperty(property)) {
        target[property] = dirtyObject[property];
      }
    }
    return target;
  }
  function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var options = dirtyOptions || {};
    var locale2 = options.locale;
    var localeWeekStartsOn = locale2 && locale2.options && locale2.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date2 = toDate(dirtyDate);
    var day = toInteger(dirtyDay);
    var currentDay = date2.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date2.setUTCDate(date2.getUTCDate() + diff);
    return date2;
  }
  function setUTCISODay(dirtyDate, dirtyDay) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var day = toInteger(dirtyDay);
    if (day % 7 === 0) {
      day = day - 7;
    }
    var weekStartsOn = 1;
    var date2 = toDate(dirtyDate);
    var currentDay = date2.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date2.setUTCDate(date2.getUTCDate() + diff);
    return date2;
  }
  function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var isoWeek = toInteger(dirtyISOWeek);
    var diff = getUTCISOWeek(date2) - isoWeek;
    date2.setUTCDate(date2.getUTCDate() - diff * 7);
    return date2;
  }
  function setUTCWeek(dirtyDate, dirtyWeek, options) {
    if (arguments.length < 2) {
      throw new TypeError("2 arguments required, but only " + arguments.length + " present");
    }
    var date2 = toDate(dirtyDate);
    var week = toInteger(dirtyWeek);
    var diff = getUTCWeek(date2, options) - week;
    date2.setUTCDate(date2.getUTCDate() - diff * 7);
    return date2;
  }
  var MILLISECONDS_IN_HOUR = 36e5;
  var MILLISECONDS_IN_MINUTE$1 = 6e4;
  var MILLISECONDS_IN_SECOND = 1e3;
  var numericPatterns = {
    month: /^(1[0-2]|0?\d)/,
    date: /^(3[0-1]|[0-2]?\d)/,
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    week: /^(5[0-3]|[0-4]?\d)/,
    hour23h: /^(2[0-3]|[0-1]?\d)/,
    hour24h: /^(2[0-4]|[0-1]?\d)/,
    hour11h: /^(1[0-1]|0?\d)/,
    hour12h: /^(1[0-2]|0?\d)/,
    minute: /^[0-5]?\d/,
    second: /^[0-5]?\d/,
    singleDigit: /^\d/,
    twoDigits: /^\d{1,2}/,
    threeDigits: /^\d{1,3}/,
    fourDigits: /^\d{1,4}/,
    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/,
    twoDigitsSigned: /^-?\d{1,2}/,
    threeDigitsSigned: /^-?\d{1,3}/,
    fourDigitsSigned: /^-?\d{1,4}/
  };
  var timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
  };
  function parseNumericPattern(pattern, string, valueCallback) {
    var matchResult = string.match(pattern);
    if (!matchResult) {
      return null;
    }
    var value = parseInt(matchResult[0], 10);
    return {
      value: valueCallback ? valueCallback(value) : value,
      rest: string.slice(matchResult[0].length)
    };
  }
  function parseTimezonePattern(pattern, string) {
    var matchResult = string.match(pattern);
    if (!matchResult) {
      return null;
    }
    if (matchResult[0] === "Z") {
      return {
        value: 0,
        rest: string.slice(1)
      };
    }
    var sign = matchResult[1] === "+" ? 1 : -1;
    var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
    return {
      value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE$1 + seconds * MILLISECONDS_IN_SECOND),
      rest: string.slice(matchResult[0].length)
    };
  }
  function parseAnyDigitsSigned(string, valueCallback) {
    return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
  }
  function parseNDigits(n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);
      default:
        return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), string, valueCallback);
    }
  }
  function parseNDigitsSigned(n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);
      default:
        return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), string, valueCallback);
    }
  }
  function dayPeriodEnumToHours(enumValue) {
    switch (enumValue) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
    var isCommonEra = currentYear > 0;
    var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
    var result;
    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      var rangeEnd = absCurrentYear + 50;
      var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
      var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }
    return isCommonEra ? result : 1 - result;
  }
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  var parsers = {
    G: {
      priority: 140,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "G":
          case "GG":
          case "GGG":
            return match2.era(string, {
              width: "abbreviated"
            }) || match2.era(string, {
              width: "narrow"
            });
          case "GGGGG":
            return match2.era(string, {
              width: "narrow"
            });
          case "GGGG":
          default:
            return match2.era(string, {
              width: "wide"
            }) || match2.era(string, {
              width: "abbreviated"
            }) || match2.era(string, {
              width: "narrow"
            });
        }
      },
      set: function(date2, flags, value, _options) {
        flags.era = value;
        date2.setUTCFullYear(value, 0, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["R", "u", "t", "T"]
    },
    y: {
      priority: 130,
      parse: function(string, token, match2, _options) {
        var valueCallback = function(year) {
          return {
            year,
            isTwoDigitYear: token === "yy"
          };
        };
        switch (token) {
          case "y":
            return parseNDigits(4, string, valueCallback);
          case "yo":
            return match2.ordinalNumber(string, {
              unit: "year",
              valueCallback
            });
          default:
            return parseNDigits(token.length, string, valueCallback);
        }
      },
      validate: function(_date, value, _options) {
        return value.isTwoDigitYear || value.year > 0;
      },
      set: function(date2, flags, value, _options) {
        var currentYear = date2.getUTCFullYear();
        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date2.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
          date2.setUTCHours(0, 0, 0, 0);
          return date2;
        }
        var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date2.setUTCFullYear(year, 0, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]
    },
    Y: {
      priority: 130,
      parse: function(string, token, match2, _options) {
        var valueCallback = function(year) {
          return {
            year,
            isTwoDigitYear: token === "YY"
          };
        };
        switch (token) {
          case "Y":
            return parseNDigits(4, string, valueCallback);
          case "Yo":
            return match2.ordinalNumber(string, {
              unit: "year",
              valueCallback
            });
          default:
            return parseNDigits(token.length, string, valueCallback);
        }
      },
      validate: function(_date, value, _options) {
        return value.isTwoDigitYear || value.year > 0;
      },
      set: function(date2, flags, value, options) {
        var currentYear = getUTCWeekYear(date2, options);
        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date2.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
          date2.setUTCHours(0, 0, 0, 0);
          return startOfUTCWeek(date2, options);
        }
        var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date2.setUTCFullYear(year, 0, options.firstWeekContainsDate);
        date2.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date2, options);
      },
      incompatibleTokens: ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]
    },
    R: {
      priority: 130,
      parse: function(string, token, _match, _options) {
        if (token === "R") {
          return parseNDigitsSigned(4, string);
        }
        return parseNDigitsSigned(token.length, string);
      },
      set: function(_date, _flags, value, _options) {
        var firstWeekOfYear = new Date(0);
        firstWeekOfYear.setUTCFullYear(value, 0, 4);
        firstWeekOfYear.setUTCHours(0, 0, 0, 0);
        return startOfUTCISOWeek(firstWeekOfYear);
      },
      incompatibleTokens: ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
    },
    u: {
      priority: 130,
      parse: function(string, token, _match, _options) {
        if (token === "u") {
          return parseNDigitsSigned(4, string);
        }
        return parseNDigitsSigned(token.length, string);
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCFullYear(value, 0, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]
    },
    Q: {
      priority: 120,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "Q":
          case "QQ":
            return parseNDigits(token.length, string);
          case "Qo":
            return match2.ordinalNumber(string, {
              unit: "quarter"
            });
          case "QQQ":
            return match2.quarter(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.quarter(string, {
              width: "narrow",
              context: "formatting"
            });
          case "QQQQQ":
            return match2.quarter(string, {
              width: "narrow",
              context: "formatting"
            });
          case "QQQQ":
          default:
            return match2.quarter(string, {
              width: "wide",
              context: "formatting"
            }) || match2.quarter(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.quarter(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 4;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMonth((value - 1) * 3, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
    },
    q: {
      priority: 120,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "q":
          case "qq":
            return parseNDigits(token.length, string);
          case "qo":
            return match2.ordinalNumber(string, {
              unit: "quarter"
            });
          case "qqq":
            return match2.quarter(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.quarter(string, {
              width: "narrow",
              context: "standalone"
            });
          case "qqqqq":
            return match2.quarter(string, {
              width: "narrow",
              context: "standalone"
            });
          case "qqqq":
          default:
            return match2.quarter(string, {
              width: "wide",
              context: "standalone"
            }) || match2.quarter(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.quarter(string, {
              width: "narrow",
              context: "standalone"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 4;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMonth((value - 1) * 3, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
    },
    M: {
      priority: 110,
      parse: function(string, token, match2, _options) {
        var valueCallback = function(value) {
          return value - 1;
        };
        switch (token) {
          case "M":
            return parseNumericPattern(numericPatterns.month, string, valueCallback);
          case "MM":
            return parseNDigits(2, string, valueCallback);
          case "Mo":
            return match2.ordinalNumber(string, {
              unit: "month",
              valueCallback
            });
          case "MMM":
            return match2.month(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.month(string, {
              width: "narrow",
              context: "formatting"
            });
          case "MMMMM":
            return match2.month(string, {
              width: "narrow",
              context: "formatting"
            });
          case "MMMM":
          default:
            return match2.month(string, {
              width: "wide",
              context: "formatting"
            }) || match2.month(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.month(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMonth(value, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]
    },
    L: {
      priority: 110,
      parse: function(string, token, match2, _options) {
        var valueCallback = function(value) {
          return value - 1;
        };
        switch (token) {
          case "L":
            return parseNumericPattern(numericPatterns.month, string, valueCallback);
          case "LL":
            return parseNDigits(2, string, valueCallback);
          case "Lo":
            return match2.ordinalNumber(string, {
              unit: "month",
              valueCallback
            });
          case "LLL":
            return match2.month(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.month(string, {
              width: "narrow",
              context: "standalone"
            });
          case "LLLLL":
            return match2.month(string, {
              width: "narrow",
              context: "standalone"
            });
          case "LLLL":
          default:
            return match2.month(string, {
              width: "wide",
              context: "standalone"
            }) || match2.month(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.month(string, {
              width: "narrow",
              context: "standalone"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMonth(value, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]
    },
    w: {
      priority: 100,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "w":
            return parseNumericPattern(numericPatterns.week, string);
          case "wo":
            return match2.ordinalNumber(string, {
              unit: "week"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 53;
      },
      set: function(date2, _flags, value, options) {
        return startOfUTCWeek(setUTCWeek(date2, value, options), options);
      },
      incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]
    },
    I: {
      priority: 100,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "I":
            return parseNumericPattern(numericPatterns.week, string);
          case "Io":
            return match2.ordinalNumber(string, {
              unit: "week"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 53;
      },
      set: function(date2, _flags, value, options) {
        return startOfUTCISOWeek(setUTCISOWeek(date2, value, options), options);
      },
      incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
    },
    d: {
      priority: 90,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "d":
            return parseNumericPattern(numericPatterns.date, string);
          case "do":
            return match2.ordinalNumber(string, {
              unit: "date"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(date2, value, _options) {
        var year = date2.getUTCFullYear();
        var isLeapYear = isLeapYearIndex(year);
        var month = date2.getUTCMonth();
        if (isLeapYear) {
          return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
        } else {
          return value >= 1 && value <= DAYS_IN_MONTH[month];
        }
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCDate(value);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]
    },
    D: {
      priority: 90,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "D":
          case "DD":
            return parseNumericPattern(numericPatterns.dayOfYear, string);
          case "Do":
            return match2.ordinalNumber(string, {
              unit: "date"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(date2, value, _options) {
        var year = date2.getUTCFullYear();
        var isLeapYear = isLeapYearIndex(year);
        if (isLeapYear) {
          return value >= 1 && value <= 366;
        } else {
          return value >= 1 && value <= 365;
        }
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMonth(0, value);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]
    },
    E: {
      priority: 90,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "E":
          case "EE":
          case "EEE":
            return match2.day(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEE":
            return match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEEE":
            return match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEE":
          default:
            return match2.day(string, {
              width: "wide",
              context: "formatting"
            }) || match2.day(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function(date2, _flags, value, options) {
        date2 = setUTCDay(date2, value, options);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["D", "i", "e", "c", "t", "T"]
    },
    e: {
      priority: 90,
      parse: function(string, token, match2, options) {
        var valueCallback = function(value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };
        switch (token) {
          case "e":
          case "ee":
            return parseNDigits(token.length, string, valueCallback);
          case "eo":
            return match2.ordinalNumber(string, {
              unit: "day",
              valueCallback
            });
          case "eee":
            return match2.day(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeee":
            return match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeeee":
            return match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
          case "eeee":
          default:
            return match2.day(string, {
              width: "wide",
              context: "formatting"
            }) || match2.day(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(string, {
              width: "short",
              context: "formatting"
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function(date2, _flags, value, options) {
        date2 = setUTCDay(date2, value, options);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]
    },
    c: {
      priority: 90,
      parse: function(string, token, match2, options) {
        var valueCallback = function(value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };
        switch (token) {
          case "c":
          case "cc":
            return parseNDigits(token.length, string, valueCallback);
          case "co":
            return match2.ordinalNumber(string, {
              unit: "day",
              valueCallback
            });
          case "ccc":
            return match2.day(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.day(string, {
              width: "short",
              context: "standalone"
            }) || match2.day(string, {
              width: "narrow",
              context: "standalone"
            });
          case "ccccc":
            return match2.day(string, {
              width: "narrow",
              context: "standalone"
            });
          case "cccccc":
            return match2.day(string, {
              width: "short",
              context: "standalone"
            }) || match2.day(string, {
              width: "narrow",
              context: "standalone"
            });
          case "cccc":
          default:
            return match2.day(string, {
              width: "wide",
              context: "standalone"
            }) || match2.day(string, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.day(string, {
              width: "short",
              context: "standalone"
            }) || match2.day(string, {
              width: "narrow",
              context: "standalone"
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function(date2, _flags, value, options) {
        date2 = setUTCDay(date2, value, options);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]
    },
    i: {
      priority: 90,
      parse: function(string, token, match2, _options) {
        var valueCallback = function(value) {
          if (value === 0) {
            return 7;
          }
          return value;
        };
        switch (token) {
          case "i":
          case "ii":
            return parseNDigits(token.length, string);
          case "io":
            return match2.ordinalNumber(string, {
              unit: "day"
            });
          case "iii":
            return match2.day(string, {
              width: "abbreviated",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "short",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting",
              valueCallback
            });
          case "iiiii":
            return match2.day(string, {
              width: "narrow",
              context: "formatting",
              valueCallback
            });
          case "iiiiii":
            return match2.day(string, {
              width: "short",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting",
              valueCallback
            });
          case "iiii":
          default:
            return match2.day(string, {
              width: "wide",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "abbreviated",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "short",
              context: "formatting",
              valueCallback
            }) || match2.day(string, {
              width: "narrow",
              context: "formatting",
              valueCallback
            });
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 7;
      },
      set: function(date2, _flags, value, options) {
        date2 = setUTCISODay(date2, value, options);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]
    },
    a: {
      priority: 80,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "a":
          case "aa":
          case "aaa":
            return match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaaa":
            return match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaa":
          default:
            return match2.dayPeriod(string, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["b", "B", "H", "K", "k", "t", "T"]
    },
    b: {
      priority: 80,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "b":
          case "bb":
          case "bbb":
            return match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbbb":
            return match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbb":
          default:
            return match2.dayPeriod(string, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["a", "B", "H", "K", "k", "t", "T"]
    },
    B: {
      priority: 80,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBBB":
            return match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBB":
          default:
            return match2.dayPeriod(string, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(string, {
              width: "narrow",
              context: "formatting"
            });
        }
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["a", "b", "t", "T"]
    },
    h: {
      priority: 70,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "h":
            return parseNumericPattern(numericPatterns.hour12h, string);
          case "ho":
            return match2.ordinalNumber(string, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 12;
      },
      set: function(date2, _flags, value, _options) {
        var isPM = date2.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date2.setUTCHours(value + 12, 0, 0, 0);
        } else if (!isPM && value === 12) {
          date2.setUTCHours(0, 0, 0, 0);
        } else {
          date2.setUTCHours(value, 0, 0, 0);
        }
        return date2;
      },
      incompatibleTokens: ["H", "K", "k", "t", "T"]
    },
    H: {
      priority: 70,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "H":
            return parseNumericPattern(numericPatterns.hour23h, string);
          case "Ho":
            return match2.ordinalNumber(string, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 23;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCHours(value, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["a", "b", "h", "K", "k", "t", "T"]
    },
    K: {
      priority: 70,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "K":
            return parseNumericPattern(numericPatterns.hour11h, string);
          case "Ko":
            return match2.ordinalNumber(string, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function(date2, _flags, value, _options) {
        var isPM = date2.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date2.setUTCHours(value + 12, 0, 0, 0);
        } else {
          date2.setUTCHours(value, 0, 0, 0);
        }
        return date2;
      },
      incompatibleTokens: ["a", "b", "h", "H", "k", "t", "T"]
    },
    k: {
      priority: 70,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "k":
            return parseNumericPattern(numericPatterns.hour24h, string);
          case "ko":
            return match2.ordinalNumber(string, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 1 && value <= 24;
      },
      set: function(date2, _flags, value, _options) {
        var hours = value <= 24 ? value % 24 : value;
        date2.setUTCHours(hours, 0, 0, 0);
        return date2;
      },
      incompatibleTokens: ["a", "b", "h", "H", "K", "t", "T"]
    },
    m: {
      priority: 60,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "m":
            return parseNumericPattern(numericPatterns.minute, string);
          case "mo":
            return match2.ordinalNumber(string, {
              unit: "minute"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 59;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMinutes(value, 0, 0);
        return date2;
      },
      incompatibleTokens: ["t", "T"]
    },
    s: {
      priority: 50,
      parse: function(string, token, match2, _options) {
        switch (token) {
          case "s":
            return parseNumericPattern(numericPatterns.second, string);
          case "so":
            return match2.ordinalNumber(string, {
              unit: "second"
            });
          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function(_date, value, _options) {
        return value >= 0 && value <= 59;
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCSeconds(value, 0);
        return date2;
      },
      incompatibleTokens: ["t", "T"]
    },
    S: {
      priority: 30,
      parse: function(string, token, _match, _options) {
        var valueCallback = function(value) {
          return Math.floor(value * Math.pow(10, -token.length + 3));
        };
        return parseNDigits(token.length, string, valueCallback);
      },
      set: function(date2, _flags, value, _options) {
        date2.setUTCMilliseconds(value);
        return date2;
      },
      incompatibleTokens: ["t", "T"]
    },
    X: {
      priority: 10,
      parse: function(string, token, _match, _options) {
        switch (token) {
          case "X":
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);
          case "XX":
            return parseTimezonePattern(timezonePatterns.basic, string);
          case "XXXX":
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);
          case "XXXXX":
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);
          case "XXX":
          default:
            return parseTimezonePattern(timezonePatterns.extended, string);
        }
      },
      set: function(date2, flags, value, _options) {
        if (flags.timestampIsSet) {
          return date2;
        }
        return new Date(date2.getTime() - value);
      },
      incompatibleTokens: ["t", "T", "x"]
    },
    x: {
      priority: 10,
      parse: function(string, token, _match, _options) {
        switch (token) {
          case "x":
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);
          case "xx":
            return parseTimezonePattern(timezonePatterns.basic, string);
          case "xxxx":
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);
          case "xxxxx":
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);
          case "xxx":
          default:
            return parseTimezonePattern(timezonePatterns.extended, string);
        }
      },
      set: function(date2, flags, value, _options) {
        if (flags.timestampIsSet) {
          return date2;
        }
        return new Date(date2.getTime() - value);
      },
      incompatibleTokens: ["t", "T", "X"]
    },
    t: {
      priority: 40,
      parse: function(string, _token, _match, _options) {
        return parseAnyDigitsSigned(string);
      },
      set: function(_date, _flags, value, _options) {
        return [new Date(value * 1e3), {
          timestampIsSet: true
        }];
      },
      incompatibleTokens: "*"
    },
    T: {
      priority: 20,
      parse: function(string, _token, _match, _options) {
        return parseAnyDigitsSigned(string);
      },
      set: function(_date, _flags, value, _options) {
        return [new Date(value), {
          timestampIsSet: true
        }];
      },
      incompatibleTokens: "*"
    }
  };
  var TIMEZONE_UNIT_PRIORITY = 10;
  var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp$1 = /^'(.*?)'?$/;
  var doubleQuoteRegExp$1 = /''/g;
  var notWhitespaceRegExp = /\S/;
  var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
  function parse(dirtyDateString, dirtyFormatString, dirtyBackupDate, dirtyOptions) {
    if (arguments.length < 3) {
      throw new TypeError("3 arguments required, but only " + arguments.length + " present");
    }
    var dateString = String(dirtyDateString);
    var formatString = String(dirtyFormatString);
    var options = dirtyOptions || {};
    var locale$1 = options.locale || locale;
    if (!locale$1.match) {
      throw new RangeError("locale must contain match property");
    }
    var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    if (formatString === "") {
      if (dateString === "") {
        return toDate(dirtyBackupDate);
      } else {
        return new Date(NaN);
      }
    }
    var subFnOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale: locale$1
    };
    var setters = [{
      priority: TIMEZONE_UNIT_PRIORITY,
      set: dateToSystemTimezone,
      index: 0
    }];
    var i;
    var tokens = formatString.match(longFormattingTokensRegExp$1).map(function(substring) {
      var firstCharacter2 = substring[0];
      if (firstCharacter2 === "p" || firstCharacter2 === "P") {
        var longFormatter = longFormatters[firstCharacter2];
        return longFormatter(substring, locale$1.formatLong, subFnOptions);
      }
      return substring;
    }).join("").match(formattingTokensRegExp$1);
    var usedTokens = [];
    for (i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
        throwProtectedError(token);
      }
      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = void 0;
          for (var _i = 0; _i < usedTokens.length; _i++) {
            var usedToken = usedTokens[_i].token;
            if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
              incompatibleToken = usedTokens[_i];
              break;
            }
          }
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.parse(dateString, token, locale$1.match, subFnOptions);
        if (!parseResult) {
          return new Date(NaN);
        }
        setters.push({
          priority: parser.priority,
          set: parser.set,
          validate: parser.validate,
          value: parseResult.value,
          index: setters.length
        });
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString$1(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return new Date(NaN);
        }
      }
    }
    if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
      return new Date(NaN);
    }
    var uniquePrioritySetters = setters.map(function(setter2) {
      return setter2.priority;
    }).sort(function(a, b) {
      return b - a;
    }).filter(function(priority, index2, array) {
      return array.indexOf(priority) === index2;
    }).map(function(priority) {
      return setters.filter(function(setter2) {
        return setter2.priority === priority;
      }).reverse();
    }).map(function(setterArray) {
      return setterArray[0];
    });
    var date2 = toDate(dirtyBackupDate);
    if (isNaN(date2)) {
      return new Date(NaN);
    }
    var utcDate = subMilliseconds(date2, getTimezoneOffsetInMilliseconds(date2));
    var flags = {};
    for (i = 0; i < uniquePrioritySetters.length; i++) {
      var setter = uniquePrioritySetters[i];
      if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
        return new Date(NaN);
      }
      var result = setter.set(utcDate, flags, setter.value, subFnOptions);
      if (result[0]) {
        utcDate = result[0];
        assign$1(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
    return utcDate;
  }
  function dateToSystemTimezone(date2, flags) {
    if (flags.timestampIsSet) {
      return date2;
    }
    var convertedDate = new Date(0);
    convertedDate.setFullYear(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
    convertedDate.setHours(date2.getUTCHours(), date2.getUTCMinutes(), date2.getUTCSeconds(), date2.getUTCMilliseconds());
    return convertedDate;
  }
  function cleanEscapedString$1(input) {
    return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
  }
  var date = lodash_clonedeep(defaultType);
  date.isRight = true;
  date.compare = function(x, y, column) {
    function cook(d) {
      if (column && column.dateInputFormat) {
        return parse("".concat(d), "".concat(column.dateInputFormat), new Date());
      }
      return d;
    }
    x = cook(x);
    y = cook(y);
    if (!isValid(x)) {
      return -1;
    }
    if (!isValid(y)) {
      return 1;
    }
    return compareAsc(x, y);
  };
  date.format = function(v, column) {
    if (v === void 0 || v === null)
      return "";
    var date2 = parse(v, column.dateInputFormat, new Date());
    if (isValid(date2)) {
      return format(date2, column.dateOutputFormat);
    }
    console.error('Not a valid date: "'.concat(v, '"'));
    return null;
  };
  var date$1 = /* @__PURE__ */ Object.freeze({
    "default": date
  });
  var number = lodash_clonedeep(defaultType);
  number.isRight = true;
  number.filterPredicate = function(rowval, filter) {
    return number.compare(rowval, filter) === 0;
  };
  number.compare = function(x, y) {
    function cook(d) {
      if (d === void 0 || d === null)
        return -Infinity;
      return d.indexOf(".") >= 0 ? parseFloat(d) : parseInt(d, 10);
    }
    x = typeof x === "number" ? x : cook(x);
    y = typeof y === "number" ? y : cook(y);
    if (x < y)
      return -1;
    if (x > y)
      return 1;
    return 0;
  };
  var number$1 = /* @__PURE__ */ Object.freeze({
    "default": number
  });
  var decimal = lodash_clonedeep(number);
  decimal.format = function(v) {
    if (v === void 0 || v === null)
      return "";
    return parseFloat(Math.round(v * 100) / 100).toFixed(2);
  };
  var decimal$1 = /* @__PURE__ */ Object.freeze({
    "default": decimal
  });
  var percentage = lodash_clonedeep(number);
  percentage.format = function(v) {
    if (v === void 0 || v === null)
      return "";
    return "".concat(parseFloat(v * 100).toFixed(2), "%");
  };
  var percentage$1 = /* @__PURE__ */ Object.freeze({
    "default": percentage
  });
  var _boolean = lodash_clonedeep(defaultType);
  _boolean.isRight = true;
  _boolean.filterPredicate = function(rowval, filter) {
    return _boolean.compare(rowval, filter) === 0;
  };
  _boolean.compare = function(x, y) {
    function cook(d) {
      if (typeof d === "boolean")
        return d ? 1 : 0;
      if (typeof d === "string")
        return d === "true" ? 1 : 0;
      return -Infinity;
    }
    x = cook(x);
    y = cook(y);
    if (x < y)
      return -1;
    if (x > y)
      return 1;
    return 0;
  };
  var _boolean$1 = /* @__PURE__ */ Object.freeze({
    "default": _boolean
  });
  var index = {
    date: date$1,
    decimal: decimal$1,
    number: number$1,
    percentage: percentage$1,
    "boolean": _boolean$1
  };
  var dataTypes = {};
  var coreDataTypes = index;
  lodash_foreach(Object.keys(coreDataTypes), function(key) {
    var compName = key.replace(/^\.\//, "").replace(/\.js/, "");
    dataTypes[compName] = coreDataTypes[key]["default"];
  });
  var script$6 = {
    name: "vue-good-table",
    props: {
      isLoading: {
        "default": null,
        type: Boolean
      },
      maxHeight: {
        "default": null,
        type: String
      },
      fixedHeader: Boolean,
      theme: {
        "default": ""
      },
      mode: {
        "default": "local"
      },
      totalRows: {},
      styleClass: {
        "default": "vgt-table bordered"
      },
      columns: {},
      rows: {},
      lineNumbers: Boolean,
      responsive: {
        "default": true,
        type: Boolean
      },
      rtl: Boolean,
      rowStyleClass: {
        "default": null,
        type: [Function, String]
      },
      compactMode: Boolean,
      groupOptions: {
        "default": function _default() {
          return {
            enabled: false,
            collapsable: false,
            rowKey: null
          };
        }
      },
      selectOptions: {
        "default": function _default() {
          return {
            enabled: false,
            selectionInfoClass: "",
            selectionText: "rows selected",
            clearSelectionText: "clear",
            disableSelectInfo: false,
            selectAllByGroup: false
          };
        }
      },
      sortOptions: {
        "default": function _default() {
          return {
            enabled: true,
            initialSortBy: {}
          };
        }
      },
      paginationOptions: {
        "default": function _default() {
          return {
            enabled: false,
            perPage: 10,
            perPageDropdown: null,
            position: "bottom",
            dropdownAllowAll: true,
            mode: "records"
          };
        }
      },
      searchOptions: {
        "default": function _default() {
          return {
            enabled: false,
            trigger: null,
            externalQuery: null,
            searchFn: null,
            placeholder: "Search Table"
          };
        }
      }
    },
    data: function data() {
      return {
        tableLoading: false,
        nextText: "Next",
        prevText: "Prev",
        rowsPerPageText: "Rows per page",
        ofText: "of",
        allText: "All",
        pageText: "page",
        selectable: false,
        selectOnCheckboxOnly: false,
        selectAllByPage: true,
        disableSelectInfo: false,
        selectionInfoClass: "",
        selectionText: "rows selected",
        clearSelectionText: "clear",
        maintainExpanded: true,
        expandedRowKeys: /* @__PURE__ */ new Set(),
        sortable: true,
        defaultSortBy: null,
        searchEnabled: false,
        searchTrigger: null,
        externalSearchQuery: null,
        searchFn: null,
        searchPlaceholder: "Search Table",
        searchSkipDiacritics: false,
        perPage: null,
        paginate: false,
        paginateOnTop: false,
        paginateOnBottom: true,
        customRowsPerPageDropdown: [],
        paginateDropdownAllowAll: true,
        paginationMode: "records",
        currentPage: 1,
        currentPerPage: 10,
        sorts: [],
        globalSearchTerm: "",
        filteredRows: [],
        columnFilters: {},
        forceSearch: false,
        sortChanged: false,
        dataTypes: dataTypes || {}
      };
    },
    watch: {
      rows: {
        handler: function handler() {
          this.$emit("update:isLoading", false);
          this.filterRows(this.columnFilters, false);
        },
        deep: true,
        immediate: true
      },
      selectOptions: {
        handler: function handler() {
          this.initializeSelect();
        },
        deep: true,
        immediate: true
      },
      paginationOptions: {
        handler: function handler(newValue, oldValue) {
          if (!lodash_isequal(newValue, oldValue)) {
            this.initializePagination();
          }
        },
        deep: true,
        immediate: true
      },
      searchOptions: {
        handler: function handler() {
          if (this.searchOptions.externalQuery !== void 0 && this.searchOptions.externalQuery !== this.searchTerm) {
            this.externalSearchQuery = this.searchOptions.externalQuery;
            this.handleSearch();
          }
          this.initializeSearch();
        },
        deep: true,
        immediate: true
      },
      sortOptions: {
        handler: function handler(newValue, oldValue) {
          if (!lodash_isequal(newValue, oldValue)) {
            this.initializeSort();
          }
        },
        deep: true
      },
      selectedRows: function selectedRows(newValue, oldValue) {
        if (!lodash_isequal(newValue, oldValue)) {
          this.$emit("on-selected-rows-change", {
            selectedRows: this.selectedRows
          });
        }
      }
    },
    computed: {
      tableStyles: function tableStyles() {
        if (this.compactMode)
          return this.tableStyleClasses + "vgt-compact";
        else
          return this.tableStyleClasses;
      },
      hasFooterSlot: function hasFooterSlot() {
        return !!this.$slots["table-actions-bottom"];
      },
      wrapperStyles: function wrapperStyles() {
        return {
          overflow: "scroll-y",
          maxHeight: this.maxHeight ? this.maxHeight : "auto"
        };
      },
      rowKeyField: function rowKeyField() {
        return this.groupOptions.rowKey || "vgt_header_id";
      },
      hasHeaderRowTemplate: function hasHeaderRowTemplate() {
        return !!this.$slots["table-header-row"] || !!this.$scopedSlots["table-header-row"];
      },
      showEmptySlot: function showEmptySlot() {
        if (!this.paginated.length)
          return true;
        if (this.paginated[0].label === "no groups" && !this.paginated[0].children.length) {
          return true;
        }
        return false;
      },
      allSelected: function allSelected() {
        return this.selectedRowCount > 0 && (this.selectAllByPage && this.selectedPageRowsCount === this.totalPageRowCount || !this.selectAllByPage && this.selectedRowCount === this.totalRowCount);
      },
      allSelectedIndeterminate: function allSelectedIndeterminate() {
        return !this.allSelected && (this.selectAllByPage && this.selectedPageRowsCount > 0 || !this.selectAllByPage && this.selectedRowCount > 0);
      },
      selectionInfo: function selectionInfo() {
        return "".concat(this.selectedRowCount, " ").concat(this.selectionText);
      },
      selectedRowCount: function selectedRowCount() {
        return this.selectedRows.length;
      },
      selectedPageRowsCount: function selectedPageRowsCount() {
        return this.selectedPageRows.length;
      },
      selectedPageRows: function selectedPageRows() {
        var selectedRows = [];
        lodash_foreach(this.paginated, function(headerRow) {
          lodash_foreach(headerRow.children, function(row) {
            if (row.vgtSelected) {
              selectedRows.push(row);
            }
          });
        });
        return selectedRows;
      },
      selectedRows: function selectedRows() {
        var selectedRows2 = [];
        lodash_foreach(this.processedRows, function(headerRow) {
          lodash_foreach(headerRow.children, function(row) {
            if (row.vgtSelected) {
              selectedRows2.push(row);
            }
          });
        });
        return selectedRows2.sort(function(r1, r2) {
          return r1.originalIndex - r2.originalIndex;
        });
      },
      fullColspan: function fullColspan() {
        var fullColspan2 = 0;
        for (var i = 0; i < this.columns.length; i += 1) {
          if (!this.columns[i].hidden) {
            fullColspan2 += 1;
          }
        }
        if (this.lineNumbers)
          fullColspan2++;
        if (this.selectable)
          fullColspan2++;
        return fullColspan2;
      },
      groupHeaderOnTop: function groupHeaderOnTop() {
        if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === "bottom") {
          return false;
        }
        if (this.groupOptions && this.groupOptions.enabled)
          return true;
        return false;
      },
      groupHeaderOnBottom: function groupHeaderOnBottom() {
        if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === "bottom") {
          return true;
        }
        return false;
      },
      totalRowCount: function totalRowCount() {
        var total = 0;
        lodash_foreach(this.processedRows, function(headerRow) {
          total += headerRow.children ? headerRow.children.length : 0;
        });
        return total;
      },
      totalPageRowCount: function totalPageRowCount() {
        var total = 0;
        lodash_foreach(this.paginated, function(headerRow) {
          total += headerRow.children ? headerRow.children.length : 0;
        });
        return total;
      },
      wrapStyleClasses: function wrapStyleClasses() {
        var classes = "vgt-wrap";
        if (this.rtl)
          classes += " rtl";
        classes += " ".concat(this.theme);
        return classes;
      },
      tableStyleClasses: function tableStyleClasses() {
        var classes = this.styleClass;
        classes += " ".concat(this.theme);
        return classes;
      },
      searchTerm: function searchTerm() {
        return this.externalSearchQuery != null ? this.externalSearchQuery : this.globalSearchTerm;
      },
      globalSearchAllowed: function globalSearchAllowed() {
        if (this.searchEnabled && !!this.globalSearchTerm && this.searchTrigger !== "enter") {
          return true;
        }
        if (this.externalSearchQuery != null && this.searchTrigger !== "enter") {
          return true;
        }
        if (this.forceSearch) {
          this.forceSearch = false;
          return true;
        }
        return false;
      },
      processedRows: function processedRows() {
        var _this = this;
        var computedRows = this.filteredRows;
        if (this.mode === "remote") {
          return computedRows;
        }
        if (this.globalSearchAllowed) {
          var allRows = [];
          lodash_foreach(this.filteredRows, function(headerRow) {
            allRows.push.apply(allRows, _toConsumableArray(headerRow.children));
          });
          var filteredRows = [];
          lodash_foreach(allRows, function(row) {
            lodash_foreach(_this.columns, function(col) {
              if (!col.globalSearchDisabled) {
                if (_this.searchFn) {
                  var foundMatch = _this.searchFn(row, col, _this.collectFormatted(row, col), _this.searchTerm);
                  if (foundMatch) {
                    filteredRows.push(row);
                    return false;
                  }
                } else {
                  var matched = defaultType.filterPredicate(_this.collectFormatted(row, col), _this.searchTerm, _this.searchSkipDiacritics);
                  if (matched) {
                    filteredRows.push(row);
                    return false;
                  }
                }
              }
            });
          });
          this.$emit("on-search", {
            searchTerm: this.searchTerm,
            rowCount: filteredRows.length
          });
          computedRows = [];
          lodash_foreach(this.filteredRows, function(headerRow) {
            var i = headerRow.vgt_header_id;
            var children = lodash_filter(filteredRows, ["vgt_id", i]);
            if (children.length) {
              var newHeaderRow = lodash_clonedeep(headerRow);
              newHeaderRow.children = children;
              computedRows.push(newHeaderRow);
            }
          });
        }
        if (this.sorts.length) {
          computedRows.forEach(function(cRows) {
            cRows.children.sort(function(xRow, yRow) {
              var sortValue;
              for (var i = 0; i < _this.sorts.length; i += 1) {
                var column = _this.getColumnForField(_this.sorts[i].field);
                var xvalue = _this.collect(xRow, _this.sorts[i].field);
                var yvalue = _this.collect(yRow, _this.sorts[i].field);
                var sortFn = column.sortFn;
                if (sortFn && typeof sortFn === "function") {
                  sortValue = sortValue || sortFn(xvalue, yvalue, column, xRow, yRow) * (_this.sorts[i].type === "desc" ? -1 : 1);
                } else {
                  sortValue = sortValue || column.typeDef.compare(xvalue, yvalue, column) * (_this.sorts[i].type === "desc" ? -1 : 1);
                }
              }
              return sortValue;
            });
          });
        }
        if (this.searchTrigger === "enter") {
          this.filteredRows = computedRows;
        }
        return computedRows;
      },
      paginated: function paginated() {
        var _this2 = this;
        if (!this.processedRows.length)
          return [];
        if (this.mode === "remote") {
          return this.processedRows;
        }
        var paginatedRows = [];
        lodash_foreach(this.processedRows, function(childRows) {
          var _paginatedRows;
          if (_this2.groupOptions.enabled) {
            paginatedRows.push(childRows);
          }
          (_paginatedRows = paginatedRows).push.apply(_paginatedRows, _toConsumableArray(childRows.children));
        });
        if (this.paginate) {
          var pageStart = (this.currentPage - 1) * this.currentPerPage;
          if (pageStart >= paginatedRows.length || this.currentPerPage === -1) {
            this.currentPage = 1;
            pageStart = 0;
          }
          var pageEnd = paginatedRows.length + 1;
          if (this.currentPerPage !== -1) {
            pageEnd = this.currentPage * this.currentPerPage;
          }
          paginatedRows = paginatedRows.slice(pageStart, pageEnd);
        }
        var reconstructedRows = [];
        paginatedRows.forEach(function(flatRow) {
          if (flatRow.vgt_header_id !== void 0) {
            _this2.handleExpanded(flatRow);
            var newHeaderRow = lodash_clonedeep(flatRow);
            newHeaderRow.children = [];
            reconstructedRows.push(newHeaderRow);
          } else {
            var hRow = reconstructedRows.find(function(r) {
              return r.vgt_header_id === flatRow.vgt_id;
            });
            if (!hRow) {
              hRow = _this2.processedRows.find(function(r) {
                return r.vgt_header_id === flatRow.vgt_id;
              });
              if (hRow) {
                hRow = lodash_clonedeep(hRow);
                hRow.children = [];
                reconstructedRows.push(hRow);
              }
            }
            hRow.children.push(flatRow);
          }
        });
        return reconstructedRows;
      },
      originalRows: function originalRows() {
        var rows = lodash_clonedeep(this.rows);
        var nestedRows = [];
        if (!this.groupOptions.enabled) {
          nestedRows = this.handleGrouped([{
            label: "no groups",
            children: rows
          }]);
        } else {
          nestedRows = this.handleGrouped(rows);
        }
        var index2 = 0;
        lodash_foreach(nestedRows, function(headerRow, i) {
          lodash_foreach(headerRow.children, function(row, j) {
            row.originalIndex = index2++;
          });
        });
        return nestedRows;
      },
      typedColumns: function typedColumns() {
        var columns = lodash_assign(this.columns, []);
        for (var i = 0; i < this.columns.length; i++) {
          var column = columns[i];
          column.typeDef = this.dataTypes[column.type] || defaultType;
        }
        return columns;
      },
      hasRowClickListener: function hasRowClickListener() {
        return this.$listeners && this.$listeners["on-row-click"];
      }
    },
    methods: {
      handleExpanded: function handleExpanded(headerRow) {
        if (this.maintainExpanded && this.expandedRowKeys.has(headerRow[this.rowKeyField])) {
          this.$set(headerRow, "vgtIsExpanded", true);
        } else {
          this.$set(headerRow, "vgtIsExpanded", false);
        }
      },
      toggleExpand: function toggleExpand(id) {
        var _this3 = this;
        var headerRow = this.filteredRows.find(function(r) {
          return r[_this3.rowKeyField] === id;
        });
        if (headerRow) {
          this.$set(headerRow, "vgtIsExpanded", !headerRow.vgtIsExpanded);
        }
        if (this.maintainExpanded && headerRow.vgtIsExpanded) {
          this.expandedRowKeys.add(headerRow[this.rowKeyField]);
        } else {
          this.expandedRowKeys["delete"](headerRow[this.rowKeyField]);
        }
      },
      expandAll: function expandAll() {
        var _this4 = this;
        this.filteredRows.forEach(function(row) {
          _this4.$set(row, "vgtIsExpanded", true);
          if (_this4.maintainExpanded) {
            _this4.expandedRowKeys.add(row[_this4.rowKeyField]);
          }
        });
      },
      collapseAll: function collapseAll() {
        var _this5 = this;
        this.filteredRows.forEach(function(row) {
          _this5.$set(row, "vgtIsExpanded", false);
          _this5.expandedRowKeys.clear();
        });
      },
      getColumnForField: function getColumnForField(field) {
        for (var i = 0; i < this.typedColumns.length; i += 1) {
          if (this.typedColumns[i].field === field)
            return this.typedColumns[i];
        }
      },
      handleSearch: function handleSearch() {
        this.resetTable();
        if (this.mode === "remote") {
          this.$emit("on-search", {
            searchTerm: this.searchTerm
          });
        }
      },
      reset: function reset() {
        this.initializeSort();
        this.changePage(1);
        this.$refs["table-header-primary"].reset(true);
        if (this.$refs["table-header-secondary"]) {
          this.$refs["table-header-secondary"].reset(true);
        }
      },
      emitSelectedRows: function emitSelectedRows() {
        this.$emit("on-select-all", {
          selected: this.selectedRowCount === this.totalRowCount,
          selectedRows: this.selectedRows
        });
      },
      unselectAllInternal: function unselectAllInternal(forceAll) {
        var _this6 = this;
        var rows = this.selectAllByPage && !forceAll ? this.paginated : this.filteredRows;
        lodash_foreach(rows, function(headerRow, i) {
          lodash_foreach(headerRow.children, function(row, j) {
            _this6.$set(row, "vgtSelected", false);
          });
        });
        this.emitSelectedRows();
      },
      toggleSelectAll: function toggleSelectAll() {
        var _this7 = this;
        if (this.allSelected) {
          this.unselectAllInternal();
          return;
        }
        var rows = this.selectAllByPage ? this.paginated : this.filteredRows;
        lodash_foreach(rows, function(headerRow) {
          lodash_foreach(headerRow.children, function(row) {
            _this7.$set(row, "vgtSelected", true);
          });
        });
        this.emitSelectedRows();
      },
      toggleSelectGroup: function toggleSelectGroup(event, headerRow) {
        var _this8 = this;
        lodash_foreach(headerRow.children, function(row) {
          _this8.$set(row, "vgtSelected", event.checked);
        });
      },
      changePage: function changePage(value) {
        if (this.paginationOptions.enabled) {
          var paginationWidget = this.$refs.paginationBottom;
          if (this.paginationOptions.position === "top") {
            paginationWidget = this.$refs.paginationTop;
          }
          if (paginationWidget) {
            paginationWidget.currentPage = value;
            this.currentPage = value;
          }
        }
      },
      pageChangedEvent: function pageChangedEvent() {
        return {
          currentPage: this.currentPage,
          currentPerPage: this.currentPerPage,
          total: Math.floor(this.totalRowCount / this.currentPerPage)
        };
      },
      pageChanged: function pageChanged(pagination) {
        this.currentPage = pagination.currentPage;
        var pageChangedEvent = this.pageChangedEvent();
        pageChangedEvent.prevPage = pagination.prevPage;
        this.$emit("on-page-change", pageChangedEvent);
        if (this.mode === "remote") {
          this.$emit("update:isLoading", true);
        }
      },
      perPageChanged: function perPageChanged(pagination) {
        this.currentPerPage = pagination.currentPerPage;
        var perPageChangedEvent = this.pageChangedEvent();
        this.$emit("on-per-page-change", perPageChangedEvent);
        if (this.mode === "remote") {
          this.$emit("update:isLoading", true);
        }
      },
      changeSort: function changeSort(sorts) {
        this.sorts = sorts;
        this.$emit("on-sort-change", sorts);
        this.changePage(1);
        if (this.mode === "remote") {
          this.$emit("update:isLoading", true);
          return;
        }
        this.sortChanged = true;
      },
      onCheckboxClicked: function onCheckboxClicked(row, index2, event) {
        this.$set(row, "vgtSelected", !row.vgtSelected);
        this.$emit("on-row-click", {
          row,
          pageIndex: index2,
          selected: !!row.vgtSelected,
          event
        });
      },
      onRowDoubleClicked: function onRowDoubleClicked(row, index2, event) {
        this.$emit("on-row-dblclick", {
          row,
          pageIndex: index2,
          selected: !!row.vgtSelected,
          event
        });
      },
      onRowClicked: function onRowClicked(row, index2, event) {
        if (this.selectable && !this.selectOnCheckboxOnly) {
          this.$set(row, "vgtSelected", !row.vgtSelected);
        }
        this.$emit("on-row-click", {
          row,
          pageIndex: index2,
          selected: !!row.vgtSelected,
          event
        });
      },
      onRowAuxClicked: function onRowAuxClicked(row, index2, event) {
        this.$emit("on-row-aux-click", {
          row,
          pageIndex: index2,
          selected: !!row.vgtSelected,
          event
        });
      },
      onCellClicked: function onCellClicked(row, column, rowIndex, event) {
        this.$emit("on-cell-click", {
          row,
          column,
          rowIndex,
          event
        });
      },
      onMouseenter: function onMouseenter(row, index2) {
        this.$emit("on-row-mouseenter", {
          row,
          pageIndex: index2
        });
      },
      onMouseleave: function onMouseleave(row, index2) {
        this.$emit("on-row-mouseleave", {
          row,
          pageIndex: index2
        });
      },
      searchTableOnEnter: function searchTableOnEnter() {
        if (this.searchTrigger === "enter") {
          this.handleSearch();
          this.filteredRows = lodash_clonedeep(this.originalRows);
          this.forceSearch = true;
          this.sortChanged = true;
        }
      },
      searchTableOnKeyUp: function searchTableOnKeyUp() {
        if (this.searchTrigger !== "enter") {
          this.handleSearch();
        }
      },
      resetTable: function resetTable() {
        this.unselectAllInternal(true);
        this.changePage(1);
      },
      collect: function collect(obj, field) {
        function dig(obj2, selector) {
          var result = obj2;
          var splitter = selector.split(".");
          for (var i = 0; i < splitter.length; i++) {
            if (typeof result === "undefined" || result === null) {
              return void 0;
            }
            result = result[splitter[i]];
          }
          return result;
        }
        if (typeof field === "function")
          return field(obj);
        if (typeof field === "string")
          return dig(obj, field);
        return void 0;
      },
      collectFormatted: function collectFormatted(obj, column) {
        var headerRow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var value;
        if (headerRow && column.headerField) {
          value = this.collect(obj, column.headerField);
        } else {
          value = this.collect(obj, column.field);
        }
        if (value === void 0)
          return "";
        if (column.formatFn && typeof column.formatFn === "function") {
          return column.formatFn(value, obj);
        }
        var type = column.typeDef;
        if (!type) {
          type = this.dataTypes[column.type] || defaultType;
        }
        var result = type.format(value, column);
        if (this.compactMode && (result == "" || result == null))
          return "-";
        return result;
      },
      formattedRow: function formattedRow(row) {
        var isHeaderRow = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var formattedRow2 = {};
        for (var i = 0; i < this.typedColumns.length; i++) {
          var col = this.typedColumns[i];
          if (col.field) {
            formattedRow2[col.field] = this.collectFormatted(row, col, isHeaderRow);
          }
        }
        return formattedRow2;
      },
      getClasses: function getClasses(index2, element, row) {
        var _this$typedColumns$in = this.typedColumns[index2], typeDef = _this$typedColumns$in.typeDef, custom = _this$typedColumns$in["".concat(element, "Class")];
        var isRight = typeDef.isRight;
        if (this.rtl)
          isRight = true;
        var classes = {
          "vgt-right-align": isRight,
          "vgt-left-align": !isRight
        };
        if (typeof custom === "function") {
          classes[custom(row)] = true;
        } else if (typeof custom === "string") {
          classes[custom] = true;
        }
        return classes;
      },
      filterRows: function filterRows(columnFilters) {
        var _this9 = this;
        var fromFilter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        this.columnFilters = columnFilters;
        var computedRows = lodash_clonedeep(this.originalRows);
        if (this.columnFilters && Object.keys(this.columnFilters).length) {
          if (this.mode !== "remote" || fromFilter) {
            this.changePage(1);
          }
          if (fromFilter) {
            this.$emit("on-column-filter", {
              columnFilters: this.columnFilters
            });
          }
          if (this.mode === "remote") {
            if (fromFilter) {
              this.$emit("update:isLoading", true);
            } else {
              this.filteredRows = computedRows;
            }
            return;
          }
          var _loop = function _loop2(i2) {
            var col = _this9.typedColumns[i2];
            if (_this9.columnFilters[col.field]) {
              computedRows = lodash_foreach(computedRows, function(headerRow) {
                var newChildren = headerRow.children.filter(function(row) {
                  if (col.filterOptions && typeof col.filterOptions.filterFn === "function") {
                    return col.filterOptions.filterFn(_this9.collect(row, col.field), _this9.columnFilters[col.field]);
                  }
                  var typeDef = col.typeDef;
                  return typeDef.filterPredicate(_this9.collect(row, col.field), _this9.columnFilters[col.field], false, col.filterOptions && _typeof(col.filterOptions.filterDropdownItems) === "object");
                });
                headerRow.children = newChildren;
              });
            }
          };
          for (var i = 0; i < this.typedColumns.length; i++) {
            _loop(i);
          }
        }
        this.filteredRows = computedRows;
      },
      getCurrentIndex: function getCurrentIndex(index2) {
        return (this.currentPage - 1) * this.currentPerPage + index2 + 1;
      },
      getRowStyleClass: function getRowStyleClass(row) {
        var classes = "";
        if (this.hasRowClickListener)
          classes += "clickable";
        var rowStyleClasses;
        if (typeof this.rowStyleClass === "function") {
          rowStyleClasses = this.rowStyleClass(row);
        } else {
          rowStyleClasses = this.rowStyleClass;
        }
        if (rowStyleClasses) {
          classes += " ".concat(rowStyleClasses);
        }
        return classes;
      },
      handleGrouped: function handleGrouped(originalRows) {
        var _this10 = this;
        lodash_foreach(originalRows, function(headerRow, i) {
          headerRow.vgt_header_id = i;
          if (_this10.groupOptions.maintainExpanded && _this10.expandedRowKeys.has(headerRow[_this10.groupOptions.rowKey])) {
            _this10.$set(headerRow, "vgtIsExpanded", true);
          }
          lodash_foreach(headerRow.children, function(childRow) {
            childRow.vgt_id = i;
          });
        });
        return originalRows;
      },
      initializePagination: function initializePagination() {
        var _this11 = this;
        var _this$paginationOptio = this.paginationOptions, enabled = _this$paginationOptio.enabled, perPage = _this$paginationOptio.perPage, position = _this$paginationOptio.position, perPageDropdown = _this$paginationOptio.perPageDropdown, dropdownAllowAll = _this$paginationOptio.dropdownAllowAll, nextLabel = _this$paginationOptio.nextLabel, prevLabel = _this$paginationOptio.prevLabel, rowsPerPageLabel = _this$paginationOptio.rowsPerPageLabel, ofLabel = _this$paginationOptio.ofLabel, pageLabel = _this$paginationOptio.pageLabel, allLabel = _this$paginationOptio.allLabel, setCurrentPage = _this$paginationOptio.setCurrentPage, mode = _this$paginationOptio.mode;
        if (typeof enabled === "boolean") {
          this.paginate = enabled;
        }
        if (typeof perPage === "number") {
          this.perPage = perPage;
        }
        if (position === "top") {
          this.paginateOnTop = true;
          this.paginateOnBottom = false;
        } else if (position === "both") {
          this.paginateOnTop = true;
          this.paginateOnBottom = true;
        }
        if (Array.isArray(perPageDropdown) && perPageDropdown.length) {
          this.customRowsPerPageDropdown = perPageDropdown;
          if (!this.perPage) {
            var _perPageDropdown = _slicedToArray(perPageDropdown, 1);
            this.perPage = _perPageDropdown[0];
          }
        }
        if (typeof dropdownAllowAll === "boolean") {
          this.paginateDropdownAllowAll = dropdownAllowAll;
        }
        if (typeof mode === "string") {
          this.paginationMode = mode;
        }
        if (typeof nextLabel === "string") {
          this.nextText = nextLabel;
        }
        if (typeof prevLabel === "string") {
          this.prevText = prevLabel;
        }
        if (typeof rowsPerPageLabel === "string") {
          this.rowsPerPageText = rowsPerPageLabel;
        }
        if (typeof ofLabel === "string") {
          this.ofText = ofLabel;
        }
        if (typeof pageLabel === "string") {
          this.pageText = pageLabel;
        }
        if (typeof allLabel === "string") {
          this.allText = allLabel;
        }
        if (typeof setCurrentPage === "number") {
          setTimeout(function() {
            _this11.changePage(setCurrentPage);
          }, 500);
        }
      },
      initializeSearch: function initializeSearch() {
        var _this$searchOptions = this.searchOptions, enabled = _this$searchOptions.enabled, trigger = _this$searchOptions.trigger, externalQuery = _this$searchOptions.externalQuery, searchFn = _this$searchOptions.searchFn, placeholder = _this$searchOptions.placeholder, skipDiacritics = _this$searchOptions.skipDiacritics;
        if (typeof enabled === "boolean") {
          this.searchEnabled = enabled;
        }
        if (trigger === "enter") {
          this.searchTrigger = trigger;
        }
        if (typeof externalQuery === "string") {
          this.externalSearchQuery = externalQuery;
        }
        if (typeof searchFn === "function") {
          this.searchFn = searchFn;
        }
        if (typeof placeholder === "string") {
          this.searchPlaceholder = placeholder;
        }
        if (typeof skipDiacritics === "boolean") {
          this.searchSkipDiacritics = skipDiacritics;
        }
      },
      initializeSort: function initializeSort() {
        var _this$sortOptions = this.sortOptions, enabled = _this$sortOptions.enabled, initialSortBy = _this$sortOptions.initialSortBy;
        if (typeof enabled === "boolean") {
          this.sortable = enabled;
        }
        if (_typeof(initialSortBy) === "object") {
          var ref = this.fixedHeader ? this.$refs["table-header-secondary"] : this.$refs["table-header-primary"];
          if (Array.isArray(initialSortBy)) {
            ref.setInitialSort(initialSortBy);
          } else {
            var hasField = Object.prototype.hasOwnProperty.call(initialSortBy, "field");
            if (hasField)
              ref.setInitialSort([initialSortBy]);
          }
        }
      },
      initializeSelect: function initializeSelect() {
        var _this$selectOptions = this.selectOptions, enabled = _this$selectOptions.enabled, selectionInfoClass = _this$selectOptions.selectionInfoClass, selectionText = _this$selectOptions.selectionText, clearSelectionText = _this$selectOptions.clearSelectionText, selectOnCheckboxOnly = _this$selectOptions.selectOnCheckboxOnly, selectAllByPage = _this$selectOptions.selectAllByPage, disableSelectInfo = _this$selectOptions.disableSelectInfo, selectAllByGroup = _this$selectOptions.selectAllByGroup;
        if (typeof enabled === "boolean") {
          this.selectable = enabled;
        }
        if (typeof selectOnCheckboxOnly === "boolean") {
          this.selectOnCheckboxOnly = selectOnCheckboxOnly;
        }
        if (typeof selectAllByPage === "boolean") {
          this.selectAllByPage = selectAllByPage;
        }
        if (typeof selectAllByGroup === "boolean") {
          this.selectAllByGroup = selectAllByGroup;
        }
        if (typeof disableSelectInfo === "boolean") {
          this.disableSelectInfo = disableSelectInfo;
        }
        if (typeof selectionInfoClass === "string") {
          this.selectionInfoClass = selectionInfoClass;
        }
        if (typeof selectionText === "string") {
          this.selectionText = selectionText;
        }
        if (typeof clearSelectionText === "string") {
          this.clearSelectionText = clearSelectionText;
        }
      }
    },
    mounted: function mounted() {
      if (this.perPage) {
        this.currentPerPage = this.perPage;
      }
      this.initializeSort();
    },
    components: {
      "vgt-pagination": __vue_component__$1,
      "vgt-global-search": __vue_component__$2,
      "vgt-header-row": __vue_component__$5,
      "vgt-table-header": __vue_component__$4
    }
  };
  var __vue_script__$6 = script$6;
  var __vue_render__$6 = function __vue_render__2() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      "class": _vm.wrapStyleClasses
    }, [_vm.isLoading ? _c("div", {
      staticClass: "vgt-loading vgt-center-align"
    }, [_vm._t("loadingContent", [_c("span", {
      staticClass: "vgt-loading__content"
    }, [_vm._v("\n        Loading...\n      ")])])], 2) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "vgt-inner-wrap",
      "class": {
        "is-loading": _vm.isLoading
      }
    }, [_vm.paginate && _vm.paginateOnTop ? _vm._t("pagination-top", [_c("vgt-pagination", {
      ref: "paginationTop",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })], {
      "pageChanged": _vm.pageChanged,
      "perPageChanged": _vm.perPageChanged,
      "total": _vm.totalRows || _vm.totalRowCount
    }) : _vm._e(), _vm._v(" "), _c("vgt-global-search", {
      attrs: {
        "search-enabled": _vm.searchEnabled && _vm.externalSearchQuery == null,
        "global-search-placeholder": _vm.searchPlaceholder
      },
      on: {
        "on-keyup": _vm.searchTableOnKeyUp,
        "on-enter": _vm.searchTableOnEnter
      },
      model: {
        value: _vm.globalSearchTerm,
        callback: function callback($$v) {
          _vm.globalSearchTerm = $$v;
        },
        expression: "globalSearchTerm"
      }
    }, [_c("template", {
      slot: "internal-table-actions"
    }, [_vm._t("table-actions")], 2)], 2), _vm._v(" "), _vm.selectedRowCount && !_vm.disableSelectInfo ? _c("div", {
      staticClass: "vgt-selection-info-row clearfix",
      "class": _vm.selectionInfoClass
    }, [_vm._v("\n      " + _vm._s(_vm.selectionInfo) + "\n      "), _c("a", {
      attrs: {
        "href": ""
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.unselectAllInternal(true);
        }
      }
    }, [_vm._v("\n        " + _vm._s(_vm.clearSelectionText) + "\n      ")]), _vm._v(" "), _c("div", {
      staticClass: "vgt-selection-info-row__actions vgt-pull-right"
    }, [_vm._t("selected-row-actions")], 2)]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "vgt-fixed-header"
    }, [_vm.fixedHeader ? _c("table", {
      "class": _vm.tableStyleClasses
    }, [_c("vgt-table-header", {
      ref: "table-header-secondary",
      tag: "thead",
      attrs: {
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "all-selected": _vm.allSelected,
        "all-selected-indeterminate": _vm.allSelectedIndeterminate,
        "mode": _vm.mode,
        "sortable": _vm.sortable,
        "typed-columns": _vm.typedColumns,
        "getClasses": _vm.getClasses,
        "searchEnabled": _vm.searchEnabled,
        "paginated": _vm.paginated,
        "table-ref": _vm.$refs.table
      },
      on: {
        "on-toggle-select-all": _vm.toggleSelectAll,
        "on-sort-change": _vm.changeSort,
        "filter-changed": _vm.filterRows
      },
      scopedSlots: _vm._u([{
        key: "table-column",
        fn: function fn(props) {
          return [_vm._t("table-column", [_c("span", [_vm._v(_vm._s(props.column.label))])], {
            "column": props.column
          })];
        }
      }], null, true)
    })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
      "class": {
        "vgt-responsive": _vm.responsive
      },
      style: _vm.wrapperStyles
    }, [_c("table", {
      ref: "table",
      "class": _vm.tableStyles
    }, [_c("vgt-table-header", {
      ref: "table-header-primary",
      tag: "thead",
      attrs: {
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "all-selected": _vm.allSelected,
        "all-selected-indeterminate": _vm.allSelectedIndeterminate,
        "mode": _vm.mode,
        "sortable": _vm.sortable,
        "typed-columns": _vm.typedColumns,
        "getClasses": _vm.getClasses,
        "searchEnabled": _vm.searchEnabled
      },
      on: {
        "on-toggle-select-all": _vm.toggleSelectAll,
        "on-sort-change": _vm.changeSort,
        "filter-changed": _vm.filterRows
      },
      scopedSlots: _vm._u([{
        key: "table-column",
        fn: function fn(props) {
          return [_vm._t("table-column", [_c("span", [_vm._v(_vm._s(props.column.label))])], {
            "column": props.column
          })];
        }
      }, {
        key: "column-filter",
        fn: function fn(props) {
          return [_vm._t("column-filter", null, {
            "column": props.column,
            "updateFilters": props.updateFilters
          })];
        }
      }], null, true)
    }), _vm._v(" "), _vm._l(_vm.paginated, function(headerRow, index2) {
      return _c("tbody", {
        key: index2
      }, [_vm.groupHeaderOnTop ? _c("vgt-header-row", {
        "class": _vm.getRowStyleClass(headerRow),
        attrs: {
          "header-row": headerRow,
          "columns": _vm.columns,
          "line-numbers": _vm.lineNumbers,
          "selectable": _vm.selectable,
          "select-all-by-group": _vm.selectAllByGroup,
          "collapsable": _vm.groupOptions.collapsable,
          "collect-formatted": _vm.collectFormatted,
          "formatted-row": _vm.formattedRow,
          "get-classes": _vm.getClasses,
          "full-colspan": _vm.fullColspan,
          "groupIndex": index2
        },
        on: {
          "vgtExpand": function vgtExpand($event) {
            return _vm.toggleExpand(headerRow[_vm.rowKeyField]);
          },
          "on-select-group-change": function onSelectGroupChange($event) {
            return _vm.toggleSelectGroup($event, headerRow);
          }
        },
        scopedSlots: _vm._u([{
          key: "table-header-row",
          fn: function fn(props) {
            return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
              "column": props.column,
              "formattedRow": props.formattedRow,
              "row": props.row
            })] : void 0;
          }
        }], null, true)
      }) : _vm._e(), _vm._v(" "), _vm._l(headerRow.children, function(row, index3) {
        return (_vm.groupOptions.collapsable ? headerRow.vgtIsExpanded : true) ? _c("tr", {
          key: row.originalIndex,
          "class": _vm.getRowStyleClass(row),
          on: {
            "mouseenter": function mouseenter($event) {
              return _vm.onMouseenter(row, index3);
            },
            "mouseleave": function mouseleave($event) {
              return _vm.onMouseleave(row, index3);
            },
            "dblclick": function dblclick($event) {
              return _vm.onRowDoubleClicked(row, index3, $event);
            },
            "click": function click($event) {
              return _vm.onRowClicked(row, index3, $event);
            },
            "auxclick": function auxclick($event) {
              return _vm.onRowAuxClicked(row, index3, $event);
            }
          }
        }, [_vm.lineNumbers ? _c("th", {
          staticClass: "line-numbers"
        }, [_vm._v("\n              " + _vm._s(_vm.getCurrentIndex(index3)) + "\n            ")]) : _vm._e(), _vm._v(" "), _vm.selectable ? _c("th", {
          staticClass: "vgt-checkbox-col",
          on: {
            "click": function click($event) {
              $event.stopPropagation();
              return _vm.onCheckboxClicked(row, index3, $event);
            }
          }
        }, [_c("input", {
          attrs: {
            "type": "checkbox"
          },
          domProps: {
            "checked": row.vgtSelected
          }
        })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function(column, i) {
          return !column.hidden && column.field ? _c("td", {
            key: i,
            "class": _vm.getClasses(i, "td", row),
            attrs: {
              "data-label": _vm.compactMode ? column.label : void 0
            },
            on: {
              "click": function click($event) {
                return _vm.onCellClicked(row, column, index3, $event);
              }
            }
          }, [_vm._t("table-row", [!column.html ? _c("span", [_vm._v("\n                  " + _vm._s(_vm.collectFormatted(row, column)) + "\n                ")]) : _vm._e(), _vm._v(" "), column.html ? _c("span", {
            domProps: {
              "innerHTML": _vm._s(_vm.collect(row, column.field))
            }
          }) : _vm._e()], {
            "row": row,
            "column": column,
            "formattedRow": _vm.formattedRow(row),
            "index": index3
          })], 2) : _vm._e();
        })], 2) : _vm._e();
      }), _vm._v(" "), _vm.groupHeaderOnBottom ? _c("vgt-header-row", {
        attrs: {
          "header-row": headerRow,
          "columns": _vm.columns,
          "line-numbers": _vm.lineNumbers,
          "selectable": _vm.selectable,
          "select-all-by-group": _vm.selectAllByGroup,
          "collect-formatted": _vm.collectFormatted,
          "formatted-row": _vm.formattedRow,
          "get-classes": _vm.getClasses,
          "full-colspan": _vm.fullColspan,
          "groupIndex": index2
        },
        on: {
          "on-select-group-change": function onSelectGroupChange($event) {
            return _vm.toggleSelectGroup($event, headerRow);
          }
        },
        scopedSlots: _vm._u([{
          key: "table-header-row",
          fn: function fn(props) {
            return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
              "column": props.column,
              "formattedRow": props.formattedRow,
              "row": props.row
            })] : void 0;
          }
        }], null, true)
      }) : _vm._e()], 2);
    }), _vm._v(" "), _vm.showEmptySlot ? _c("tbody", [_c("tr", [_c("td", {
      attrs: {
        "colspan": _vm.fullColspan
      }
    }, [_vm._t("emptystate", [_c("div", {
      staticClass: "vgt-center-align vgt-text-disabled"
    }, [_vm._v("\n                  No data for table\n                ")])])], 2)])]) : _vm._e()], 2)]), _vm._v(" "), _vm.hasFooterSlot ? _c("div", {
      staticClass: "vgt-wrap__actions-footer"
    }, [_vm._t("table-actions-bottom")], 2) : _vm._e(), _vm._v(" "), _vm.paginate && _vm.paginateOnBottom ? _vm._t("pagination-bottom", [_c("vgt-pagination", {
      ref: "paginationBottom",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })], {
      "pageChanged": _vm.pageChanged,
      "perPageChanged": _vm.perPageChanged,
      "total": _vm.totalRows || _vm.totalRowCount
    }) : _vm._e()], 2)]);
  };
  var __vue_staticRenderFns__$6 = [];
  var __vue_inject_styles__$6 = void 0;
  var __vue_scope_id__$6 = void 0;
  var __vue_module_identifier__$6 = void 0;
  var __vue_is_functional_template__$6 = false;
  var __vue_component__$6 = /* @__PURE__ */ normalizeComponent$1({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, void 0, void 0, void 0);
  var VueGoodTablePlugin = {
    install: function install(Vue, options) {
      Vue.component(__vue_component__$6.name, __vue_component__$6);
    }
  };
  if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(VueGoodTablePlugin);
  }
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", { staticClass: "k-pagetable-section" }, [_c("header", { staticClass: "k-section-header" }, [_c("k-headline", { attrs: { "link": _vm.options.link } }, [_vm.isLoading ? _c("span", [_vm._v("\u2026")]) : _c("span", [_vm._v(_vm._s(_vm.headline))])]), _c("k-button-group", [_vm.showReset ? _c("button", { staticClass: "pagetable-reset-button", domProps: { "innerHTML": _vm._s(_vm.translations.reset) }, on: { "click": _vm.resetTable } }) : _vm._e(), _vm.showSearch ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.searchTerm, expression: "searchTerm" }], staticClass: "pagetable-search-input", attrs: { "type": "text", "placeholder": _vm.translations.filter }, domProps: { "value": _vm.searchTerm }, on: { "input": function($event) {
      if ($event.target.composing) {
        return;
      }
      _vm.searchTerm = $event.target.value;
    } } }) : _vm._e(), _vm.add ? _c("k-button", { attrs: { "icon": "add" }, on: { "click": _vm.create } }, [_vm._v(_vm._s(_vm.$t("add")))]) : _vm._e()], 1)], 1), _vm.rows.length && !_vm.isLoading ? _c("vue-good-table", { ref: "table", attrs: { "columns": _vm.columns, "rows": _vm.rows, "sort-options": _vm.sortOptions, "search-options": _vm.searchOptions, "pagination-options": _vm.paginationOptions }, on: { "on-search": _vm.onSearch, "on-sort-change": _vm.onSortChange, "on-page-change": _vm.onPageChange, "on-per-page-change": _vm.onPerPageChange }, scopedSlots: _vm._u([{ key: "table-row", fn: function(props) {
      return [props.column.field == "p-cover-image" && _vm.options.showImage ? _c("span", [_c("k-link", { attrs: { "to": props.row.link } }, [props.row.image ? _c("k-item-image", { attrs: { "image": props.row.image } }) : _vm._e()], 1)], 1) : props.column.field == "p-options" && _vm.showOptions ? _c("span", [_c("div", { staticClass: "k-list-item-options" }, [_vm._t("options", function() {
        return [props.row.flag && _vm.options.showStatus ? _c("k-status-icon", _vm._b({}, "k-status-icon", props.row.flag, false)) : _vm._e(), props.row.options && _vm.options.showActions ? _c("k-options-dropdown", { staticClass: "k-item-options-dropdown", attrs: { "options": props.row.options } }) : _vm._e()];
      })], 2)]) : _c("k-link", { attrs: { "to": props.row.link }, domProps: { "innerHTML": _vm._s(_vm.replaceInvalidDate(props.formattedRow[props.column.field])) } })];
    } }], null, false, 1687883122) }) : !_vm.rows.length && !_vm.isLoading ? [_c("k-empty", { attrs: { "layout": _vm.options.layout, "data-invalid": _vm.isInvalid, "icon": "page" }, on: { "click": _vm.create } }, [_vm._v(" " + _vm._s(_vm.translations.empty) + " ")]), _c("footer", { staticClass: "k-collection-footer" }, [_vm.help ? _c("k-text", { staticClass: "k-collection-help", attrs: { "theme": "help" }, domProps: { "innerHTML": _vm._s(_vm.help) } }) : _vm._e()], 1)] : _vm.isLoading ? _c("div", { staticClass: "loading" }, [_c("k-empty", { attrs: { "layout": _vm.options.layout, "icon": "pagetableLoader" } }, [_vm._v(" " + _vm._s(_vm.translations.loading) + " ")])], 1) : _vm._e()], 2);
  };
  var staticRenderFns = [];
  render._withStripped = true;
  var PageTable_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const __vue2_script = {
    extends: "k-pages-section",
    components: { VueGoodTable: __vue_component__$6 },
    data() {
      return {
        columns: [],
        rows: [],
        searchTerm: "",
        showReset: false,
        error: null,
        isLoading: false,
        storedState: {
          searchTerm: void 0,
          sort: void 0,
          page: void 0
        },
        options: {
          empty: null,
          headline: null,
          layout: "list",
          link: null,
          max: null,
          min: null,
          size: null,
          sortable: null,
          limit: 10,
          limitOptions: [],
          search: true,
          showImage: true,
          showStatus: true,
          showActions: true
        },
        translations: {
          rowsPerPage: this.$t("pagetable.rowsPerPage"),
          of: this.$t("pagetable.of"),
          all: this.$t("pagetable.all"),
          empty: this.$t("pages.empty"),
          filter: this.$t("pagetable.filter-pages"),
          reset: this.$t("pagetable.reset"),
          loading: this.$t("pagetable.loading")
        }
      };
    },
    props: {
      parent: String,
      blueprint: String,
      name: String
    },
    computed: {
      searchOptions() {
        return {
          enabled: true,
          externalQuery: this.searchTerm
        };
      },
      sortOptions() {
        return {
          enabled: true,
          initialSortBy: this.storedState.sort || false
        };
      },
      storedPerPage() {
        return this.storedState.page ? this.storedState.page.currentPerPage || this.options.limit : this.options.limit;
      },
      storedPage() {
        return this.storedState.page ? this.storedState.page.currentPage || false : false;
      },
      paginationOptions() {
        return {
          enabled: true,
          perPage: this.storedPerPage,
          setCurrentPage: this.storedPage,
          perPageDropdown: this.options.limitOptions,
          nextLabel: this.$t("next"),
          prevLabel: this.$t("prev"),
          rowsPerPageLabel: this.translations.rowsPerPage,
          ofLabel: this.$t("pagetable.of"),
          allLabel: this.translations.all
        };
      },
      showSearch() {
        return this.columns.filter((el) => el.globalSearchDisabled == false).length > 0 && this.options.search && this.rows.length;
      },
      storeName() {
        return "kirby$plugin$pagetable" + this.parent + "-" + this.name;
      },
      showOptions() {
        return this.options.showStatus || this.options.showActions;
      }
    },
    watch: {
      language() {
        this.reload();
      }
    },
    created() {
      this.load();
      this.loadStoredState();
    },
    methods: {
      replaceInvalidDate(str) {
        return str.replace("Invalid Date", "-");
      },
      load(reload) {
        if (!reload)
          this.isLoading = true;
        this.$api.get(this.parent + "/sections/" + this.name).then((response) => {
          this.isLoading = false;
          this.options = response.options;
          this.columns = response.data.columns;
          this.rows = this.items(response.data.rows);
          let translations = response.translations;
          Object.keys(translations).forEach((k) => {
            if (translations[k] == null)
              delete translations[k];
          });
          this.translations = Object.assign({}, this.translations, translations);
        }).catch((error) => {
          this.isLoading = false;
          this.error = error.message;
        });
      },
      openRef(id) {
        this.$refs[id].toggle();
      },
      onSearch(params) {
        this.storeCurrentState();
        this.checkReset();
      },
      onPerPageChange(params) {
        if (this.$refs["table"]) {
          this.$refs["table"].changePage(1);
        }
      },
      onPageChange(params) {
        this.storeCurrentState();
        this.checkReset();
      },
      onSortChange(params) {
        this.storeCurrentState();
        this.checkReset();
      },
      checkReset() {
        this.showReset = this.rows.length && (this.searchTerm.length > 0 || this.$refs["table"] && this.$refs["table"].sorts.length || this.$refs["table"] && this.$refs["table"].currentPage != 1);
      },
      loadStoredState() {
        let storedState = JSON.parse(sessionStorage.getItem(this.storeName));
        if (storedState !== null) {
          this.storedState = storedState;
          if (storedState.searchTerm && storedState.searchTerm.length > 0) {
            this.searchTerm = storedState.searchTerm;
          }
        }
      },
      storeCurrentState() {
        if (this.$refs["table"]) {
          let currentState = {};
          currentState.page = {
            currentPage: this.$refs["table"].currentPage,
            currentPerPage: this.$refs["table"].currentPerPage
          };
          if (this.$refs["table"].sorts[0]) {
            currentState.sort = {
              field: this.$refs["table"].sorts[0].field,
              type: this.$refs["table"].sorts[0].type
            };
          }
          currentState.searchTerm = this.searchTerm;
          sessionStorage.setItem(this.storeName, JSON.stringify(currentState));
        }
      },
      resetTable() {
        this.$refs["table"].changeSort([]);
        let sorted = document.querySelectorAll(".sorting");
        sorted.forEach((el) => {
          if (el.tagName == "TH") {
            el.classList.remove("sorting", "sorting-asc", "sorting-desc");
          }
        });
        this.searchTerm = "";
        this.$refs["table"].currentPerPage = this.options.limit;
        this.$refs["table"].perPage = this.options.limit;
        this.$refs["table"].changePage(1);
        this.storeCurrentState();
      }
    }
  };
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  __component__.options.__file = "src/components/PageTable.vue";
  var PageTable = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  panel.plugin("sylvainjule/pagetable", {
    sections: {
      "pagetable": PageTable
    },
    icons: {
      pagetableLoader: '<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="1.75"><circle cx="7" cy="7" r="7.2" stroke="#000" stroke-opacity=".2"/><path d="M14.2,7c0-4-3.2-7.2-7.2-7.2" stroke="#000"><animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="1s" repeatCount="indefinite"/></path></g></g>'
    }
  });
})();
