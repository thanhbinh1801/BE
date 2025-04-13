import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import user_router from './routes/user_router.js';
import userModels from './models/user_models.js'; 
import methodOverride from 'method-override';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', user_router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});