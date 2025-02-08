"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setHeader = function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ALLOW_CORS_ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTION");
    res.header("Access-Control-Allow-Headers", "content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
};
exports.default = setHeader;
