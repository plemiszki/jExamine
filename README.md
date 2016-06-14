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
