//import 
import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

//get all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get a single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//update a thought by id
export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//delete a thought by id
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        await User.findByIdAndUpdate(req.body.userId, { $pull: { thoughts: req.params.thoughtId } });
    } catch (err) {
        res.status(500).json(err);
    }
};