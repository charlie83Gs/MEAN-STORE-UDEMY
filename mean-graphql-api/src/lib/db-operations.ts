import { Db } from "mongodb";

/**
 *
 * @param db mongo db database in which to execute the query
 * @param collection a string with the name of the collection0
 * @param sort a mongo db sort object
 * @returns the next available id to asign to the product
 */

export const getNewDocumentId = async (
  db: Db,
  collection: string,
  sort: object = { registerDate: -1 }
) => {
  //get las registered user name
  const lastElement = await db
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();

  if (lastElement.length <= 0) {
    return 1;
  }

  return lastElement[0].id + 1;
};

export const findOneElement = async (
  db: Db,
  collection: string,
  filter: object
) => {
  return await db.collection(collection).findOne(filter);
};

export const findManyElements = async (
  db: Db,
  collection: string,
  filter: object = {}
) => {
  return await await db.collection(collection).find(filter).toArray();
};

export const insertOneElement = async (
  db: Db,
  collection: string,
  document: object
) => {
  return await db.collection(collection).insertOne(document);
};

export const insertManyElement = async (
  db: Db,
  collection: string,
  documents: Array<object>
) => {
  return await db.collection(collection).insertMany(documents);
};
