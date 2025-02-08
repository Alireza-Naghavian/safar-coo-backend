"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, _req, res, _next) {
    var message = err.message, name = err.name, data = err.data, status = err.status;
    console.log("==> Start Error <==");
    console.log(err);
    console.log("==> End Error <==");
    return res.status(status || 500).json({
        message: message || "Internal Server Error",
        data: data || null,
        name: name || "Error",
    });
};
exports.default = errorHandler;
