import express from 'express';

import fs from 'fs';
const router = express.Router();

router.post('/upload', async (req, res, next) => {
  req.busboy.on('file', async function(fieldname, file, filename, encoding, mimetype) {
    try {

      file.pipe(fs.createWriteStream(filename));
    } catch(err) {
      console.log(err);
    }

  });

    res.status(200).json({});

});

router.get('/teste', async (req, res, next) => {
  const fileName = await crypto.randomBytes(64).toString('hex');


});


module.exports = router;
