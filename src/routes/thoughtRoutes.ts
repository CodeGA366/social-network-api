import express from 'express';
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../controllers/thoughtController';

const router = express.Router();

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router.route('/:userId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:userId/reactions')
    .post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/reactions/:reactionId')
    .delete(removeReaction)

export default router;