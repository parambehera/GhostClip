import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/clip-routes.js';
import fileRouter from './routes/file-router.js';
import imageRoutes from './routes/image-route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use clip routes
app.use('/', router);
app.use("/", fileRouter);
app.use("/", imageRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

