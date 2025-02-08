"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorMessage = void 0;
var createErrorMessage = function (_a) {
    var field = _a.field, min = _a.min, max = _a.max;
    return ({
        "string.empty": "".concat(field, " \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0627\u0644\u06CC \u0628\u0627\u0634\u062F."),
        "string.min": "\u062D\u062F\u0627\u0642\u0644 ".concat(min, " \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631."),
        "string.max": "\u062D\u062F\u0627\u06A9\u062B\u0631 ".concat(max, " \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631."),
        "any.required": "".concat(field, " \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0627\u0644\u06CC \u0628\u0627\u0634\u062F."),
    });
};
exports.createErrorMessage = createErrorMessage;
