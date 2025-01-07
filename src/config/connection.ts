import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/socialNetworkAPI', {
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection failed:', error.message);
        } else {
            console.error('MongoDB connection failed:', error);
        }
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;