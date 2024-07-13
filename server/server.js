const express = require('express');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser=require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
connectDB();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true  // Allow sending cookies across domains
}));
app.use(cookieParser())
app.use(express.json());


app.use('/api/profiles', profileRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
