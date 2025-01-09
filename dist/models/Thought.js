"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//Reaction Schema 
const ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
});
//Thought Schema
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (Timestamp) => new Date(Timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
//virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//create thought model
const Thought = (0, mongoose_1.model)('Thought', ThoughtSchema);
//export thought model
exports.default = Thought;
