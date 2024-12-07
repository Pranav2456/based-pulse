/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/nanoassert";
exports.ids = ["vendor-chunks/nanoassert"];
exports.modules = {

/***/ "(ssr)/./node_modules/nanoassert/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoassert/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("module.exports = assert\n\nclass AssertionError extends Error {}\nAssertionError.prototype.name = 'AssertionError'\n\n/**\n * Minimal assert function\n * @param  {any} t Value to check if falsy\n * @param  {string=} m Optional assertion error message\n * @throws {AssertionError}\n */\nfunction assert (t, m) {\n  if (!t) {\n    var err = new AssertionError(m)\n    if (Error.captureStackTrace) Error.captureStackTrace(err, assert)\n    throw err\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbmFub2Fzc2VydC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLEtBQUs7QUFDakIsWUFBWSxTQUFTO0FBQ3JCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXdhcmUtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uYW5vYXNzZXJ0L2luZGV4LmpzPzdjOGIiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhc3NlcnRcblxuY2xhc3MgQXNzZXJ0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InXG5cbi8qKlxuICogTWluaW1hbCBhc3NlcnQgZnVuY3Rpb25cbiAqIEBwYXJhbSAge2FueX0gdCBWYWx1ZSB0byBjaGVjayBpZiBmYWxzeVxuICogQHBhcmFtICB7c3RyaW5nPX0gbSBPcHRpb25hbCBhc3NlcnRpb24gZXJyb3IgbWVzc2FnZVxuICogQHRocm93cyB7QXNzZXJ0aW9uRXJyb3J9XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCAodCwgbSkge1xuICBpZiAoIXQpIHtcbiAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKG0pXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIGFzc2VydClcbiAgICB0aHJvdyBlcnJcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/nanoassert/index.js\n");

/***/ })

};
;