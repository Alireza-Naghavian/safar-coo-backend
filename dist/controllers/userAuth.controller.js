"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var auth_1 = require("../utils/auth");
var user_schema_1 = require("../validations/user.schema");
var controller_1 = __importDefault(require("./controller"));
var userAuthController = /** @class */ (function (_super) {
    __extends(userAuthController, _super);
    function userAuthController() {
        return _super.call(this) || this;
    }
    userAuthController.prototype.signUpUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, username, hasuser, hashUserPassword, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                        return [4 /*yield*/, user_schema_1.userSignUpValidation.validateAsync(req.body)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, user_1.default.findOne({ email: email }, "_id")];
                    case 2:
                        hasuser = _b.sent();
                        if (hasuser) {
                            return [2 /*return*/, res.status(401).json({
                                    message: "کاربری با این ایمیل ثبت نام کرده است.",
                                    status: 401,
                                })];
                        }
                        return [4 /*yield*/, (0, auth_1.hashPassword)(password)];
                    case 3:
                        hashUserPassword = _b.sent();
                        return [4 /*yield*/, user_1.default.create({
                                email: email,
                                username: username,
                                password: hashUserPassword,
                            })];
                    case 4:
                        newUser = _b.sent();
                        //   set jwt token
                        (0, auth_1.setAccessToken)(res, newUser);
                        (0, auth_1.setRefreshToken)(res, newUser);
                        return [2 /*return*/, res.status(201)
                                .json({ message: "ثبت نام با موفقیت انجام شد.", status: 201 })];
                    case 5:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    userAuthController.prototype.signIn = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, isValidPassword, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_schema_1.signInUserValidation.validateAsync(req.body)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, user_1.default.findOne({ email: email }, "username email password ")];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "کاربری با این مشخصات یافت نشد", data: null, status: 404 })];
                        }
                        return [4 /*yield*/, (0, auth_1.comparePassword)(password, user === null || user === void 0 ? void 0 : user.password)];
                    case 3:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, res.status(403).json({ message: "اطلاعات وارد شده صحیح نمی باشد", data: null, status: 403 })];
                        }
                        return [4 /*yield*/, (0, auth_1.setAccessToken)(res, user)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, (0, auth_1.setRefreshToken)(res, user)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ message: "ورود با موفقیت انجام شد.", status: 200 })];
                    case 6:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userAuthController.prototype.getMe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log(req.user);
                    // const token = verifyAccessToken(req,res,next)
                    // console.log(token)
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return userAuthController;
}(controller_1.default));
var AuthController = new userAuthController();
exports.default = AuthController;
