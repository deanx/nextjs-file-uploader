import crypto from 'crypto';
import fs from 'fs';
import util from 'util';
import { insertFile } from '../lib/db';

export const getTemporaryFileName = str => crypto.createHash('md5').update(str).digest('hex');

export const storeFile = tmpFileName => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(tmpFileName);
  const hash = crypto.createHash('md5');

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const fileHash = hash.digest('hex');
    fs.rename(tmpFileName, fileHash, (err) => {
      if (err) reject();
      else resolve();
    });

    fileSavePerm(fileHash);

  });
});


const fileSavePerm = (fileHash) => {
  /**
   Send file to a cloud storage
   This upload should be done using a stream writer
   This upload show be done detached from the current thread
    * */

  insertFile(fileHash, `./${fileHash}`);
};
