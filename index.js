import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config(); 
import user_router from './routes/user_router.js';

const PORT = process.env.PORT; 

const app = express(); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CRUD')
})

app.use(user_router);

app.listen(8000, () => { 
  console.log(`server in running on http://localhost:${PORT}`);
})