import express from 'express';
import fs from 'fs';
import { getTemporaryFileName, storeFile } from "../lib/files";

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  req.busboy.on('file', async function(fieldname, file, filename, encoding, mimetype) {
    try {
      // upload the file with a temporary name
      const tmpName = getTemporaryFileName(filename, encoding, mimetype);
      file.pipe(fs.createWriteStream(tmpName));

      file.on('end', () => {
        storeFile(tmpName).then((result) => console.log('volteeei') );
      });
    } catch(err) {
      console.log(err);
    }

  });

    res.status(200).json({});

});
module.exports = router;
