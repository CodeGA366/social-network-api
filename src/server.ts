import express from 'express';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';
import connectDB from './config/connection';

const app = express();
const PORT = 3001; // Set a default port

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});