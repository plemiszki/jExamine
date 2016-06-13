/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	var arrayOfFunctions = [];
	
	window.$l = function(arg) {
	  if(typeof arg === 'function') {
	    if (document.readyState === "complete") {
	        arg();
	    } else {
	      arrayOfFunctions.push(arg);
	    }
	  } else if (arg instanceof Object) {
	    return new DOMNodeCollection([arg]);
	  } else {
	    var nodeList = document.querySelectorAll(arg);
	    var array = [].slice.call(nodeList);
	    return new DOMNodeCollection(array);
	  }
	};
	
	$l.extend = function () {
	  var mainObject = arguments[0];
	  var objectArguments = [].slice.call(arguments, 1);
	
	  for (var i = 0; i < objectArguments.length; i++) {
	    var objectKeys = Object.keys(objectArguments[i]);
	      for (var j = 0; j < objectKeys.length; j++) {
	        mainObject[objectKeys[j]] = objectArguments[i][objectKeys[j]];
	      }
	  }
	  return mainObject;
	};
	
	$l.ajax = function (options) {
	  options = options || {};
	
	  defaults = {
	    method: 'GET',
	    url: "",
	    data: {},
	    contentType: "text/html",
	    success: function() {},
	    error: function() {},
	  };
	
	  options = this.extend(defaults, options);
	
	  if (options.method.toUpperCase() === "GET") {
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  var xhr = new XMLHttpRequest();
	  xhr.open(options.method, options.url);
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      options.success(JSON.parse(xhr.response));
	    } else {
	      options.error(JSON.parse(xhr.response));
	    }
	  };
	  xhr.send(JSON.stringify(options.data));
	};
	
	function toQueryString (obj){
	  var result = "";
	  for(var prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	document.addEventListener("DOMContentLoaded", function () {
	  for (var i = 0; i < arrayOfFunctions.length; i++) {
	    arrayOfFunctions[i]();
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection (HTMLElements) {
	  HTMLElements = HTMLElements || [];
	  this.HTMLElements = HTMLElements;
	}
	
	DOMNodeCollection.prototype.html = function (string) {
	  if (string === undefined){
	    return this.HTMLElements[0].innerHTML;
	  } else {
	    for (var i = 0; i < this.HTMLElements.length; i++) {
	      this.HTMLElements[i].innerHTML = string;
	    }
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].innerHTML = "";
	  }
	};
	
	
	DOMNodeCollection.prototype.append = function (arg) {
	  if (arg instanceof DOMNodeCollection){
	    for (var i = 0; i < arg.HTMLElements.length; i++) {
	      for (var j = 0; j < this.HTMLElements.length; j++) {
	        var dupedElement = arg.HTMLElements[i].cloneNode(true);
	        this.HTMLElements[j].appendChild(dupedElement);
	      }
	    }
	  } else if (typeof arg === 'object'){
	    for (var k = 0; k < this.HTMLElements.length; k++) {
	      var dupedElement2 = arg.cloneNode(true);
	      this.HTMLElements[k].appendChild(dupedElement2);
	    }
	  } else if (typeof arg === 'string'){
	    for (var p = 0; p < this.HTMLElements.length; p++) {
	      this.HTMLElements[p].innerHTML += arg;
	    }
	
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (attribute, value) {
	  if (value === undefined) {
	    return this.HTMLElements[0].getAttribute(attribute);
	  } else {
	    for (var i = 0; i < this.HTMLElements.length; i++) {
	      this.HTMLElements[i].setAttribute(attribute, value);
	    }
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (klass) {
	  this.attr("class", klass);
	};
	
	DOMNodeCollection.prototype.removeClass = function (klass) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].removeAttribute("class", klass);
	  }
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var returnCollection = new DOMNodeCollection();
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    var childrenArray = [].slice.call(this.HTMLElements[i].children);
	    returnCollection.HTMLElements = returnCollection.HTMLElements.concat(childrenArray);
	  }
	  return returnCollection;
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var returnCollection = new DOMNodeCollection();
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    returnCollection.HTMLElements.push(this.HTMLElements[i].parentNode);
	  }
	  return returnCollection;
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var returnCollection = new DOMNodeCollection();
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    var array = [].slice.call(this.HTMLElements[i].querySelectorAll(selector));
	    returnCollection.HTMLElements = returnCollection.HTMLElements.concat(array);
	  }
	  return returnCollection;
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].innerHTML = "";
	    this.HTMLElements[i].parentNode.removeChild(this.HTMLElements[i]);
	  }
	};
	
	DOMNodeCollection.prototype.on = function (type, func) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].addEventListener(type, func);
	  }
	};
	
	DOMNodeCollection.prototype.off = function (type, func) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].removeEventListener(type, func);
	  }
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jExamine.js.map