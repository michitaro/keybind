/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var keybind = __webpack_require__(2);
window.addEventListener('load', function () {
    keybind.on('shift+x', function () { return alert('shift + X'); });
    keybind.on('alt+x', function () { return alert('alt + X'); });
    keybind.on('ctrl+x', function () { return alert('ctrl + X'); });
    keybind.on('meta+x', function () { return alert('meta + X'); });
    // can be triggered only once
    var off = keybind.on('shift+ctrl+x', function () {
        alert('shift + ctrl + X (triggered only once)');
        off();
    });
    var sources = ['shift+x', 'alt+x', 'ctrl+x', 'meta+x', 'shift+ctrl+x'];
    for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
        var s = sources_1[_i];
        var html = keybind.html(s);
        var div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var KeyCombination = /** @class */ (function () {
    function KeyCombination(source) {
        this.alt = false;
        this.shift = false;
        this.ctrl = false;
        this.meta = false;
        var MODIFIERS = ['alt', 'shift', 'ctrl', 'meta'];
        var keys = source.split('+');
        for (var _i = 0, MODIFIERS_1 = MODIFIERS; _i < MODIFIERS_1.length; _i++) {
            var m = MODIFIERS_1[_i];
            var i = keys.indexOf(m);
            if (i >= 0) {
                this[m] = true;
                keys.splice(i, 1);
            }
        }
        if (keys.length != 1)
            throw new Error("invalid keybind source: " + source);
        var key = keys[0];
        this.key = key.length == 1 ? this.key = "Key" + key.toUpperCase() : key;
    }
    KeyCombination.prototype.match = function (e) {
        return (e.altKey == this.alt &&
            e.shiftKey == this.shift &&
            e.ctrlKey == this.ctrl &&
            e.metaKey == this.meta &&
            whichKey(e) == this.key);
    };
    KeyCombination.prototype.html = function () {
        var m = this.key.match(/^Key([A-Z])$/);
        var key = m ? m[1] : this.key;
        return [
            this.alt ? '&#x2325;' : '',
            this.shift ? '&#x21e7;' : '',
            this.ctrl ? '&#x2303;' : '',
            this.meta ? '&#x2318;' : '',
            key
        ].join('');
    };
    return KeyCombination;
}());
function whichKey(e) {
    if (e.code)
        return e.code;
    return "Key" + String.fromCharCode(e.keyCode);
}
var Keybind = /** @class */ (function () {
    function Keybind(kc, handler) {
        this.kc = kc;
        this.handler = handler;
    }
    return Keybind;
}());
var keybinds = [];
document.addEventListener('keydown', function (e) {
    if (e.target != document.body)
        return;
    for (var _i = 0, keybinds_1 = keybinds; _i < keybinds_1.length; _i++) {
        var kb = keybinds_1[_i];
        if (kb.kc.match(e)) {
            e.preventDefault();
            kb.handler(e);
        }
    }
});
function on(source, handler) {
    var kb = new Keybind(new KeyCombination(source), handler);
    keybinds.push(kb);
    return function () {
        var i = keybinds.indexOf(kb);
        console.assert(i >= 0);
        keybinds.splice(i, 1);
    };
}
exports.on = on;
function html(source) {
    return (new KeyCombination(source)).html();
}
exports.html = html;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ })
/******/ ]);