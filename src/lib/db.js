import low from 'lowdb';
const Filesync = require('lowdb/adapters/FileSync')

const adapter = new Filesync('db.json')
const db = low(adapter)
db.defaults({ files: [] }).write();

export const insertFile = (hash, location) => {
  db.get('files').push({hash, location}).write();
}


export const findFile = (hash) => {
  const file = db.get('files').find({ hash }).value();
  return file;
};
