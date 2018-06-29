import low from 'lowdb';

const Filesync = require('lowdb/adapters/FileSync');

const adapter = new Filesync('db.json');
const db = low(adapter);
db.defaults({ files: [], fileQueue: 0 }).write();

export const insertFile = (hash, location) => {
  db.get('files').push({ hash, location }).write();
};


export const findFile = (hash) => {
  const file = db.get('files').find({ hash }).value();
  return file;
};

export const lockOnFiles = () => {
  db.set('fileQueue', db.get('fileQueue').value() + 1).write();
};

export const unLockOnFiles = () => {
  db.set('fileQueue', db.get('fileQueue').value() - 1).write();
};

export const validateFileQueue = () => {
  if (db.get('fileQueue').value() > 5) return false;
  return true;
};
