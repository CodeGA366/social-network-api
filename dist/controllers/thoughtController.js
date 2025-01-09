"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
//get all thoughts
const getAllThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.default.find();
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllThoughts = getAllThoughts;
//get a single thought by id
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughtById = getThoughtById;
//create a new thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield Thought_1.default.create(req.body);
        yield User_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createThought = createThought;
//update a thought by id
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield Thought_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.status(200).json(updatedThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateThought = updateThought;
//delete a thought by id
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield Thought_1.default.findByIdAndDelete(req.params.userId);
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        yield User_1.default.findByIdAndUpdate(req.body.userId, { $pull: { thoughts: req.params.userId } });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
// Add a reaction to a thought
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        // Push the new reaction to the reactions array
        thought.reactions.push(req.body);
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addReaction = addReaction;
// Remove a reaction from a thought
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.userId); // Use thoughtId instead of userId
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        // Filter out the reaction to be removed
        thought.reactions.pull({ _id: req.params.reactionId }); // Use _id to match the reaction
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
