/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/b4a";
exports.ids = ["vendor-chunks/b4a"];
exports.modules = {

/***/ "(ssr)/./node_modules/b4a/index.js":
/*!***********************************!*\
  !*** ./node_modules/b4a/index.js ***!
  \***********************************/
/***/ ((module) => {

eval("function isBuffer (value) {\n  return Buffer.isBuffer(value) || value instanceof Uint8Array\n}\n\nfunction isEncoding (encoding) {\n  return Buffer.isEncoding(encoding)\n}\n\nfunction alloc (size, fill, encoding) {\n  return Buffer.alloc(size, fill, encoding)\n}\n\nfunction allocUnsafe (size) {\n  return Buffer.allocUnsafe(size)\n}\n\nfunction allocUnsafeSlow (size) {\n  return Buffer.allocUnsafeSlow(size)\n}\n\nfunction byteLength (string, encoding) {\n  return Buffer.byteLength(string, encoding)\n}\n\nfunction compare (a, b) {\n  return Buffer.compare(a, b)\n}\n\nfunction concat (buffers, totalLength) {\n  return Buffer.concat(buffers, totalLength)\n}\n\nfunction copy (source, target, targetStart, start, end) {\n  return toBuffer(source).copy(target, targetStart, start, end)\n}\n\nfunction equals (a, b) {\n  return toBuffer(a).equals(b)\n}\n\nfunction fill (buffer, value, offset, end, encoding) {\n  return toBuffer(buffer).fill(value, offset, end, encoding)\n}\n\nfunction from (value, encodingOrOffset, length) {\n  return Buffer.from(value, encodingOrOffset, length)\n}\n\nfunction includes (buffer, value, byteOffset, encoding) {\n  return toBuffer(buffer).includes(value, byteOffset, encoding)\n}\n\nfunction indexOf (buffer, value, byfeOffset, encoding) {\n  return toBuffer(buffer).indexOf(value, byfeOffset, encoding)\n}\n\nfunction lastIndexOf (buffer, value, byteOffset, encoding) {\n  return toBuffer(buffer).lastIndexOf(value, byteOffset, encoding)\n}\n\nfunction swap16 (buffer) {\n  return toBuffer(buffer).swap16()\n}\n\nfunction swap32 (buffer) {\n  return toBuffer(buffer).swap32()\n}\n\nfunction swap64 (buffer) {\n  return toBuffer(buffer).swap64()\n}\n\nfunction toBuffer (buffer) {\n  if (Buffer.isBuffer(buffer)) return buffer\n  return Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)\n}\n\nfunction toString (buffer, encoding, start, end) {\n  return toBuffer(buffer).toString(encoding, start, end)\n}\n\nfunction write (buffer, string, offset, length, encoding) {\n  return toBuffer(buffer).write(string, offset, length, encoding)\n}\n\nfunction writeDoubleLE (buffer, value, offset) {\n  return toBuffer(buffer).writeDoubleLE(value, offset)\n}\n\nfunction writeFloatLE (buffer, value, offset) {\n  return toBuffer(buffer).writeFloatLE(value, offset)\n}\n\nfunction writeUInt32LE (buffer, value, offset) {\n  return toBuffer(buffer).writeUInt32LE(value, offset)\n}\n\nfunction writeInt32LE (buffer, value, offset) {\n  return toBuffer(buffer).writeInt32LE(value, offset)\n}\n\nfunction readDoubleLE (buffer, offset) {\n  return toBuffer(buffer).readDoubleLE(offset)\n}\n\nfunction readFloatLE (buffer, offset) {\n  return toBuffer(buffer).readFloatLE(offset)\n}\n\nfunction readUInt32LE (buffer, offset) {\n  return toBuffer(buffer).readUInt32LE(offset)\n}\n\nfunction readInt32LE (buffer, offset) {\n  return toBuffer(buffer).readInt32LE(offset)\n}\n\nfunction writeDoubleBE (buffer, value, offset) {\n  return toBuffer(buffer).writeDoubleBE(value, offset)\n}\n\nfunction writeFloatBE (buffer, value, offset) {\n  return toBuffer(buffer).writeFloatBE(value, offset)\n}\n\nfunction writeUInt32BE (buffer, value, offset) {\n  return toBuffer(buffer).writeUInt32BE(value, offset)\n}\n\nfunction writeInt32BE (buffer, value, offset) {\n  return toBuffer(buffer).writeInt32BE(value, offset)\n}\n\nfunction readDoubleBE (buffer, offset) {\n  return toBuffer(buffer).readDoubleBE(offset)\n}\n\nfunction readFloatBE (buffer, offset) {\n  return toBuffer(buffer).readFloatBE(offset)\n}\n\nfunction readUInt32BE (buffer, offset) {\n  return toBuffer(buffer).readUInt32BE(offset)\n}\n\nfunction readInt32BE (buffer, offset) {\n  return toBuffer(buffer).readInt32BE(offset)\n}\n\nmodule.exports = {\n  isBuffer,\n  isEncoding,\n  alloc,\n  allocUnsafe,\n  allocUnsafeSlow,\n  byteLength,\n  compare,\n  concat,\n  copy,\n  equals,\n  fill,\n  from,\n  includes,\n  indexOf,\n  lastIndexOf,\n  swap16,\n  swap32,\n  swap64,\n  toBuffer,\n  toString,\n  write,\n  writeDoubleLE,\n  writeFloatLE,\n  writeUInt32LE,\n  writeInt32LE,\n  readDoubleLE,\n  readFloatLE,\n  readUInt32LE,\n  readInt32LE,\n  writeDoubleBE,\n  writeFloatBE,\n  writeUInt32BE,\n  writeInt32BE,\n  readDoubleBE,\n  readFloatBE,\n  readUInt32BE,\n  readInt32BE\n\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYjRhL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hd2FyZS1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2I0YS9pbmRleC5qcz9iNTRiIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGlzQnVmZmVyICh2YWx1ZSkge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXlcbn1cblxuZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZVNsb3cgKHNpemUpIHtcbiAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3coc2l6ZSlcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICByZXR1cm4gQnVmZmVyLmJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUoYSwgYilcbn1cblxuZnVuY3Rpb24gY29uY2F0IChidWZmZXJzLCB0b3RhbExlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyLmNvbmNhdChidWZmZXJzLCB0b3RhbExlbmd0aClcbn1cblxuZnVuY3Rpb24gY29weSAoc291cmNlLCB0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiB0b0J1ZmZlcihzb3VyY2UpLmNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gZXF1YWxzIChhLCBiKSB7XG4gIHJldHVybiB0b0J1ZmZlcihhKS5lcXVhbHMoYilcbn1cblxuZnVuY3Rpb24gZmlsbCAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBlbmQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLmZpbGwodmFsdWUsIG9mZnNldCwgZW5kLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gZnJvbSAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXMgKGJ1ZmZlciwgdmFsdWUsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLmluY2x1ZGVzKHZhbHVlLCBieXRlT2Zmc2V0LCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gaW5kZXhPZiAoYnVmZmVyLCB2YWx1ZSwgYnlmZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRvQnVmZmVyKGJ1ZmZlcikuaW5kZXhPZih2YWx1ZSwgYnlmZU9mZnNldCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGxhc3RJbmRleE9mIChidWZmZXIsIHZhbHVlLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS5sYXN0SW5kZXhPZih2YWx1ZSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIHN3YXAxNiAoYnVmZmVyKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnN3YXAxNigpXG59XG5cbmZ1bmN0aW9uIHN3YXAzMiAoYnVmZmVyKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnN3YXAzMigpXG59XG5cbmZ1bmN0aW9uIHN3YXA2NCAoYnVmZmVyKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnN3YXA2NCgpXG59XG5cbmZ1bmN0aW9uIHRvQnVmZmVyIChidWZmZXIpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihidWZmZXIpKSByZXR1cm4gYnVmZmVyXG4gIHJldHVybiBCdWZmZXIuZnJvbShidWZmZXIuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nIChidWZmZXIsIGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiB3cml0ZSAoYnVmZmVyLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS53cml0ZShzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLndyaXRlRG91YmxlTEUodmFsdWUsIG9mZnNldClcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdExFIChidWZmZXIsIHZhbHVlLCBvZmZzZXQpIHtcbiAgcmV0dXJuIHRvQnVmZmVyKGJ1ZmZlcikud3JpdGVGbG9hdExFKHZhbHVlLCBvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCkge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS53cml0ZVVJbnQzMkxFKHZhbHVlLCBvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlSW50MzJMRSAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLndyaXRlSW50MzJMRSh2YWx1ZSwgb2Zmc2V0KVxufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlTEUgKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnJlYWREb3VibGVMRShvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHJlYWRGbG9hdExFIChidWZmZXIsIG9mZnNldCkge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS5yZWFkRmxvYXRMRShvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHJlYWRVSW50MzJMRSAoYnVmZmVyLCBvZmZzZXQpIHtcbiAgcmV0dXJuIHRvQnVmZmVyKGJ1ZmZlcikucmVhZFVJbnQzMkxFKG9mZnNldClcbn1cblxuZnVuY3Rpb24gcmVhZEludDMyTEUgKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnJlYWRJbnQzMkxFKG9mZnNldClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLndyaXRlRG91YmxlQkUodmFsdWUsIG9mZnNldClcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdEJFIChidWZmZXIsIHZhbHVlLCBvZmZzZXQpIHtcbiAgcmV0dXJuIHRvQnVmZmVyKGJ1ZmZlcikud3JpdGVGbG9hdEJFKHZhbHVlLCBvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCkge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS53cml0ZVVJbnQzMkJFKHZhbHVlLCBvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlSW50MzJCRSAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLndyaXRlSW50MzJCRSh2YWx1ZSwgb2Zmc2V0KVxufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlQkUgKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnJlYWREb3VibGVCRShvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHJlYWRGbG9hdEJFIChidWZmZXIsIG9mZnNldCkge1xuICByZXR1cm4gdG9CdWZmZXIoYnVmZmVyKS5yZWFkRmxvYXRCRShvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIHJlYWRVSW50MzJCRSAoYnVmZmVyLCBvZmZzZXQpIHtcbiAgcmV0dXJuIHRvQnVmZmVyKGJ1ZmZlcikucmVhZFVJbnQzMkJFKG9mZnNldClcbn1cblxuZnVuY3Rpb24gcmVhZEludDMyQkUgKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gIHJldHVybiB0b0J1ZmZlcihidWZmZXIpLnJlYWRJbnQzMkJFKG9mZnNldClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQnVmZmVyLFxuICBpc0VuY29kaW5nLFxuICBhbGxvYyxcbiAgYWxsb2NVbnNhZmUsXG4gIGFsbG9jVW5zYWZlU2xvdyxcbiAgYnl0ZUxlbmd0aCxcbiAgY29tcGFyZSxcbiAgY29uY2F0LFxuICBjb3B5LFxuICBlcXVhbHMsXG4gIGZpbGwsXG4gIGZyb20sXG4gIGluY2x1ZGVzLFxuICBpbmRleE9mLFxuICBsYXN0SW5kZXhPZixcbiAgc3dhcDE2LFxuICBzd2FwMzIsXG4gIHN3YXA2NCxcbiAgdG9CdWZmZXIsXG4gIHRvU3RyaW5nLFxuICB3cml0ZSxcbiAgd3JpdGVEb3VibGVMRSxcbiAgd3JpdGVGbG9hdExFLFxuICB3cml0ZVVJbnQzMkxFLFxuICB3cml0ZUludDMyTEUsXG4gIHJlYWREb3VibGVMRSxcbiAgcmVhZEZsb2F0TEUsXG4gIHJlYWRVSW50MzJMRSxcbiAgcmVhZEludDMyTEUsXG4gIHdyaXRlRG91YmxlQkUsXG4gIHdyaXRlRmxvYXRCRSxcbiAgd3JpdGVVSW50MzJCRSxcbiAgd3JpdGVJbnQzMkJFLFxuICByZWFkRG91YmxlQkUsXG4gIHJlYWRGbG9hdEJFLFxuICByZWFkVUludDMyQkUsXG4gIHJlYWRJbnQzMkJFXG5cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/b4a/index.js\n");

/***/ })

};
;