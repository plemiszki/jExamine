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
