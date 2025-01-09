"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports 
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// /api/users
router.route('/')
    .get(userController_1.getAllUsers)
    .post(userController_1.createUser);
// /api/users/:id
router.route('/:userId')
    .get(userController_1.getUserById)
    .put(userController_1.updateUser)
    .delete(userController_1.deleteUser);
// /api/users/:id/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(userController_1.addFriend)
    .delete(userController_1.removeFriend);
exports.default = router;
