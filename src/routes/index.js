import express from 'express';
import fs from 'fs';
import { getTemporaryFileName, storeFile, retrieveFile } from '../lib/files';

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  req.busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    try {
      // upload the file with a temporary name
      const tmpName = getTemporaryFileName(filename, encoding, mimetype);
      file.pipe(fs.createWriteStream(tmpName));

      file.on('end', () => {
        storeFile(tmpName).then((result) => {
          console.log(result);
          res.status(200).json({ result });
        });
      });
    } catch (err) {
      console.log(error);
      res.status(400).json({ error });
    }
  });
});

router.get('/files/:hash', async (req, res, next) => {
  const { location } = retrieveFile(req.params.hash);
  fs.createReadStream(location).pipe(res);
});
module.exports = router;
