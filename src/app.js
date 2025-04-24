import express from 'express';
import dotenv from 'dotenv';
import user_router from './routes/user_router.js';
import instanceDatabase from './models/singleton_pattern.js';


dotenv.config();

instanceDatabase;
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/mongoose/v1/users', user_router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});