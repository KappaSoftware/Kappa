const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "Data";
const COLLECTION_SUBCATEGORY_NAME = "Subcategories";

function getTotalData() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getTotalDataLookupSubcategory() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .aggregate([
        {
          $lookup: {
            from: COLLECTION_SUBCATEGORY_NAME,
            localField: "properties.Subcategory",
            foreignField: "_id",
            as: "properties.Subcategory",
          },
        },
      ])
      .toArray()
      .finally(() => client.close());
  });
}

function getDataWithSubcategory(subcategoryId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ "properties.Subcategory": ObjectId(subcategoryId) })
      .toArray()
      .finally(() => client.close());
  });
}

function getDataWithSubcategoryLookupSubcategory(subcategoryId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .aggregate([
        {
          $match: { "properties.Subcategory": ObjectId(subcategoryId) },
        },
        {
          $lookup: {
            from: COLLECTION_SUBCATEGORY_NAME,
            localField: "properties.Subcategory",
            foreignField: "_id",
            as: "properties.Subcategory",
          },
        },
      ])
      .toArray()
      .finally(() => client.close());
  });
}

function getOneData(dataId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(dataId) })
      .toArray()
      .finally(() => client.close());
  });
}

function insertData(newData) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        type: newData.Name_en,
        properties: {
          Category: newData.properties.Category,
          Subcategory: newData.properties.Subcategory,
        },
        geometry: {
          type: "Point",
          coordinates: newData.properties.coordinates,
        },
        compliants: 0,
      })
      .finally(() => client.close());
  });
}

function updateData(categoryId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(categoryId),
        },
        {
          $set: {
            type: newData.Name_en,
            properties: {
              Category: newData.properties.Category,
              Subcategory: newData.properties.Subcategory,
            },
            geometry: {
              type: "Point",
              coordinates: newData.properties.coordinates,
            },
            compliants: newData.compliants,
          },
        }
      )
      .finally(() => client.close());
  });
}

function deleteData(dataId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(dataId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getTotalData,
  getTotalDataLookupSubcategory,
  getDataWithSubcategory,
  getDataWithSubcategoryLookupSubcategory,
  getOneData,
  insertData,
  updateData,
  deleteData,
];
