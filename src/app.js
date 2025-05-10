import express from 'express';
import dotenv from 'dotenv';
import user_router from './routes/user_router.js';
import auth_router from './routes/auth_router.js';
import instanceDatabase from './models/singleton_pattern.js';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
const { uploader } = cloudinary.v2;
import cookieParser from 'cookie-parser';

dotenv.config();

instanceDatabase;
const app = express();
const PORT = process.env.PORT;

// cloudinary.config({
//   cloud_name: 'djl3bql4a',
//   api_key: '171534291176668',
//   api_secret: '-ESWE5GJI93l8IhKbutiadxHgVg'
// });

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/api/v1/auth', auth_router);
app.use('/api/v1/user', user_router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// var storage = multer.diskStorage({
//   destination: function ( req, file, cb) {
//     cb(null, './src/uploads');
//   },
//   filename: function (req, file, cb) {
//     const filename = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + Date.now() + filename)
//   }
// })

// var upload = multer({ storage: storage});

// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file;
//   if(!file){
//     return res.status(400).json({message: "upload error"});
//   }
//   res.status(200).send(file);
// })

// app.post('/uploadmultifile', upload.array('myFiles', 10), (req, res) => {
//   const files = req.files;
//   if(!files){
//     return res.status(400).json({message: "upload error"});
//   }
//   res.status(200).send(files);
// })

// app.post('/uploadCloudinary', upload.single('myFile'), async (req, res) => {
//   try{
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     res.status(200).json({ url: result.secure_url});
//   }
//   catch(error){
//     res.status(500).send("upload error");
//   }
// })