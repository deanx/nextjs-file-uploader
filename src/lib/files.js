import crypto from 'crypto';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import util from 'util';

const rename = util.promisify(fs.rename);
const readFile = util.promisify(fs.readFile);
const sign = util.promisify(jwt.sign);

export const getTemporaryFileName = str => crypto.createHash('md5').update(str).digest('hex');

export const storeFile = tmpFileName => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(tmpFileName);
  const hash = crypto.createHash('md5');

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', async () => {
    const fileHash = hash.digest('hex');
    try {
      const finalName = await getFinalFileName(fileHash);
      console.log('finalname', finalName);
      // fileSavePerm(...) ...

    } catch (err) {
      reject();
    }
  });
});

const getFinalFileName = async (fileHash) => {
  try {
    const key = await readFile('keypair.pem');
    const token = await sign(fileHash, key, { algorithm: 'RS256' });
    return token;
  } catch (err) {
    throw err;
  }
};



const fileSavePerm = (fs) => {
  /**
   Send file to a cloud storage
   This upload should be done using a stream writer
   This upload show be done detached from the current thread
    * */
};
