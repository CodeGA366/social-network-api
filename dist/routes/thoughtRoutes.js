"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thoughtController_1 = require("../controllers/thoughtController");
const router = express_1.default.Router();
// /api/thoughts
router.route('/')
    .get(thoughtController_1.getAllThoughts)
    .post(thoughtController_1.createThought);
// /api/thoughts/:id
router.route('/:userId')
    .get(thoughtController_1.getThoughtById)
    .put(thoughtController_1.updateThought)
    .delete(thoughtController_1.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:userId/reactions')
    .post(thoughtController_1.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/reactions/:reactionId')
    .delete(thoughtController_1.removeReaction);
exports.default = router;
