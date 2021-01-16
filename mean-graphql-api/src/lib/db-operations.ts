import { IPaginationOptions } from "./../interfaces/pagination-options";
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
    return "1";
  }

  return (Number(lastElement[0].id) + 1).toString();
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
  filter: object = {},
  paginationOtpions: IPaginationOptions = {
    page: 1,
    pages: 1,
    items: -1,
    skip: 0,
    total: -1,
  }
) => {
  if (paginationOtpions.total === -1) {
    return await db.collection(collection).find(filter).toArray();
  }
  return await db
    .collection(collection)
    .find(filter)
    .limit(paginationOtpions.items)
    .skip(paginationOtpions.skip)
    .toArray();
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

export const updateOneElement = async (
  db: Db,
  collection: string,
  filter: object,
  update: object
) => {
  return await db.collection(collection).updateOne(filter, { $set: update });
};

export const deleteOneElement = async (
  db: Db,
  collection: string,
  filter: object
) => {
  return await db.collection(collection).deleteOne(filter);
};

export const countElements = async (db: Db, collection: string) => {
  return await db.collection(collection).countDocuments();
};
