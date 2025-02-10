"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(function (method) {
            if (typeof _this[method] === "function") {
                _this[method] = _this[method].bind(_this);
            }
        });
    }
    return Controller;
}());
exports.default = Controller;
;
