//imports 
import mongoose, { Schema, Document } from 'mongoose';

//User interface 
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: mongoose.Types.ObjectId[];
    friends: mongoose.Types.ObjectId[];
    friendCount: number;
}

//User Schema
const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    friends: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
});

//virtual for friend count
UserSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends.length;
});

//create user model
const User = mongoose.model<IUser>('User', UserSchema);

//export user model
export default User;