# kuma
### Lazy properties for Objects!

kuma creates lazy properties for Objects which get evaluated & cached the first time they are accessed.
This is an easy way to delay going over the wire for an async value, or running an inline function!

## Example
```javascript
var kuma = require("kuma");
var x = {};

kuma(x, "abc", "foo");
x.abc; // "foo" <- string has been cached
x.abc; // "foo" <- accessed the cached value
x.abc = "bar"; // <- cleared the cached value, & result
x.abc; // "bar" <- string has been cached

// Creating a lazy `Promise` via `fetch()`, re-executing this would clear a cached `Promise`
kuma(x, "github", function () {
  return fetch("https://api.github.com/").then(function(response) {
    return response.json().then(function (data) {
      return data;
    }, function (e) {
      throw e;
    });
  }, function (e) {
    throw e;
  });
});

// Access the property later when you need the wired data, it'll be cached until `x.github` is overridden
x.github.then(function(data) {
  console.log(data);
}, function (e) {
  console.error(e.stack || e.message || e);
});
```

## How can I load kuma?
kuma supports AMD loaders (require.js, curl.js, etc.), node.js & npm (npm install kuma), or using a script tag.

## License
Copyright (c) 2015 Jason Mulligan
Licensed under the BSD-3 license.
