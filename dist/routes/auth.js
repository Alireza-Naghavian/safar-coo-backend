"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userAuth_controller_1 = __importDefault(require("../controllers/userAuth.controller"));
var user_middleware_1 = require("../middlewares/user.middleware");
var router = express_1.default.Router();
router.post("/signup", userAuth_controller_1.default.signUpUser);
router.post("/signin", userAuth_controller_1.default.signIn);
router.get("/getMe", user_middleware_1.verifyAccessToken, userAuth_controller_1.default.getMe);
exports.default = router;
