//imports 
import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../controllers/userController';

const router = express.Router();

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export default router;