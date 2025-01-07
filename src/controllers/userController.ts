//imports 
import { Request, Response } from 'express';
import User from '../models/User';

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get a single user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

//update a user by id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

//delete a user by id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Add a friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {$addToSet: {friends: req.params.friendId} }, { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Remove a friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};