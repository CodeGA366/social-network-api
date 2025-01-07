//user interface 
export interface User {
    _id: string;
    username: string;
    email: string;
    thoughts: string[];
    friends: string[];
}

//virtual property for friend count
export interface UserWithFriendCount extends User {
    friendCount: number;
}