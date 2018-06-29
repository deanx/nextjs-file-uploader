import express from 'express';
import fs from 'fs';
import { getTemporaryFileName, storeFile } from '../lib/files';

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  req.busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    try {
      // upload the file with a temporary name
      const tmpName = getTemporaryFileName(filename, encoding, mimetype);
      file.pipe(fs.createWriteStream(tmpName));

      file.on('end', () => {
        storeFile(tmpName).then(result => res.status(200).json({}));
      });
    } catch (err) {
      console.log(error);
      res.status(400).json({ error });
    }
  });
});

router.get('/:hash', async(req, res, next) => {

});
module.exports = router;
