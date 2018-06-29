import loki from 'lokijs';

const dbfile = './loki.json';
const db = new loki(dbfile);
const fileCollection = db.addCollection('files');

export const insertFile = (hash, location) => {
  return fileCollection.insert({ hash, location });
};

export const findFile = (hash) => {
  const fileCollection = db.find({ hash });
  return fileCollection.location;
};
