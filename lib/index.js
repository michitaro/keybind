"use strict";
exports.__esModule = true;
var KeyCombination = /** @class */ (function () {
    function KeyCombination(source) {
        this.alt = false;
        this.shift = false;
        this.ctrl = false;
        this.meta = false;
        var MODIFIERS = ['alt', 'shift', 'ctrl', 'meta'];
        var keys = source.toLowerCase().split('+');
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
        this.key = keys[0];
    }
    KeyCombination.prototype.match = function (e) {
        return (e.altKey == this.alt &&
            e.shiftKey == this.shift &&
            e.ctrlKey == this.ctrl &&
            e.metaKey == this.meta &&
            e.key.toLowerCase() == this.key);
    };
    KeyCombination.prototype.html = function () {
        return [
            this.alt ? '&#x2325;' : '',
            this.shift ? '&#x21e7;' : '',
            this.ctrl ? '&#x2303;' : '',
            this.meta ? '&#x2318;' : '',
            this.key.toUpperCase()
        ].join('');
    };
    return KeyCombination;
}());
function whichKey(e) {
    if (e.code)
        return e.code;
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
    console.log(e);
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
