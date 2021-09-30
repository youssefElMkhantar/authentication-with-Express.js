const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended : false }));

let gfs;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', 
() => {
    console.log("mongoose database connection established succesfully");
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');    
});

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
 
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file, id: req.body});
})


const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const imageRouter = require('./routes/image');

app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/image', imageRouter);

app.listen(port, () => { console.log(`server is running on port: ${port}`)});