// Require packages

const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// Initialize environment
var express = require('express');
var app = express.Router();
const config = require(__dirname + '../../ConfigFile/config.js').connectionstring;
// Create Mongo connection
const conn = mongoose.createConnection(config);

// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadPhotos');
});

// Create storage engine
const storage = new GridFsStorage({
  url: config,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
       // const filename = buf.toString('hex') + path.extname(file.originalname);
        const filename = file.originalname;
        const fileInfo = {
        filename: filename,
        bucketName: 'uploadPhotos'
      };
      resolve(fileInfo);
    });
  });
  }
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(methodOverride('_method'));

// **************************
// ROUTES
// **************************
// Home Page Route
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      console.log("No data found..")
     res.send("No files exist")
    } else {
      files.map((file) => {
        (file.contentType === 'image/jpeg' || file.contentType === 'image/png') ? file.isImage = true : file.isImage = false;
      });
      res.json(files);
    }
  });
});

// POST - Upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  gfs.files.find().sort({"uploadDate": -1}).limit(1)
  .toArray((err, files) => {
    //console.log(files[0]._id)
      res.json(files[0].filename);
    })
});

// Return array of all files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) 
    return res.send("No files exist");
    
    return res.json(files);
  });
});

// Return an individual file
app.get('/files/:filename', (req, res) => {
  console.log(req.params.filename)
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.send("No files exist");
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

// Return an individual file only if it is an image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) 
     return res.send("No files exist");
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.json({ err: 'Not an image' });
    }
  });
});

// Delete a file
app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploadPhotos' }, (err, gridStore) => {
    if (err) res.status(404).json({ err: err });
    res.redirect('/');
  });
});

module.exports = app;