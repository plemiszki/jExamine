var DOMNodeCollection = require("./dom_node_collection.js");
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
