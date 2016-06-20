# jExamine
A small JavaScript library for easy DOM traversal/manipulation, event handling, and Ajax requests.

## Core Function
jExamine's core function is $e, which is passed a single argument. The argument can be an HTML element, a CSS selector, or a function.


If passed a CSS selector, jExamine will return an array of all the HTML elements in the document that match
```javascript
  var $listItems = $e("li");
  ```

If passed an HTML element, jExamine will wrap that element in a jExamine object.
```javascript
  var $newElement = $e("<ul/>")
  ```

If passed a function, jExamine will invoke the function when the DOM has been loaded.
```javascript
  $e(function () { console.log("Hello World!") });
  ```

## jExamine Object Public API

### addClass
Add a class to DOM element(s).
```javascript
  $someElement.addClass(className)
  ```

### append
Add child elements to DOM element(s).
```javascript
  $someElement.append(children)
  ```

### attr
Get attribute of DOM element.
```javascript
  $someElement.attr(attrName)
  ```
Set attribute of DOM element(s).
```javascript
  $someElement.attr(attrName, value)
  ```

### children
Get children of DOM element(s).
```javascript
  $someElement.children()
  ```

### empty
Clear innerHTML of DOM element(s).
```javascript
  $someElement.empty()
  ```

### find
Find DOM elements by selector.
```javascript
  $someElement.find(selector)
  ```

### html
Get innerHTML of DOM element.
```javascript
  $someElement.html()
  ```
Set innerHTML of DOM element(s).
```javascript
  $someElement.html("Hello World!")
  ```

### off
Remove event listener from DOM element(s).
```javascript
  $someElement.off(eventName, callback)
  ```

### on
Add event listener to DOM element(s).
```javascript
  $someElement.on(eventName, callback)
  ```

### parent
Get parent of DOM element.
```javascript
  $someElement.parent()
  ```

### remove
Remove DOM element(s).
```javascript
  $someElement.remove()
  ```

### removeClass
Remove class to DOM element(s).
```javascript
  $someElement.removeClass(className)
  ```

## AJAX

jExamine's ajax method uses the XMLHttpRequest API to send and receive data from a server.

```javascript
  $e.ajax({
      url: "/cats",
      method: "POST",
      data: formData,
      dataType: "json",
      content-type: 'application/json',

      success: function (data) {
        console.log("Your callback here!");
      },
      error: function (data) {
        console.log("An error occurred.");
      }
  });
 ```
