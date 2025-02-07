"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.use("/user");
module.exports = {
    allRoutes: router,
};
