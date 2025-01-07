//import 
import { Reaction } from './ReactionTypes';

//thought interface
export interface Thought {
    _id: string;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Reaction[];
}

//virtual property for reaction count
export interface ThoughtWithReactionCount extends Thought {
    reactionCount: number;
}