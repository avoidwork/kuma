# kuma
### Lazy properties for Objects!

kuma creates lazy properties for Objects which get evaluated & cached the first time they are accessed.
This is an easy way to delay going over the wire for an async value, or running an inline function!

## Example
```javascript
const kuma = require("kuma");
let x = {};

kuma(x, "abc", "foo");
x.abc; // "foo" <- string has been cached
x.abc; // "foo" <- accessed the cached value
x.abc = "bar"; // <- cleared the cached value, & result
x.abc; // "bar" <- string has been cached

// Creating a lazy `Promise` via `fetch()`, re-executing this would clear a cached `Promise`
kuma(x, "github", function () {
  return fetch("https://api.github.com/").then(function(res) {
    return res.json();
  });
});

// Access the property later; it'll be cached until `x.github` is overridden
x.github.then(function(data) {
  console.log(data);
}, function (e) {
  console.error(e.stack || e.message || e);
});
```

## How can I load kuma?
kuma supports AMD loaders (require.js, curl.js, etc.), node.js & npm (npm install kuma), or using a script tag.

## License
Copyright (c) 2016 Jason Mulligan
Licensed under the BSD-3 license.
