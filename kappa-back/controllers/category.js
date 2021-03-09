const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "Categories";

function getCategories() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getCategory(categoryId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(categoryId) })
      .finally(() => client.close());
  });
}

function insertCategory(newCategory) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        Name_en: newCategory.Name_en,
        Name_es: newCategory.Name_es,
        Nickname: newCategory.Nickname,
      })
      .finally(() => client.close());
  });
}

function updateCategory(categoryId, body) {
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
            Name_en: body.Name_en,
            Name_es: body.Name_es,
            Nickname: body.Nickname,
          },
        }
      )
      .finally(() => client.close());
  });
}

function deleteCategory(categoryId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(categoryId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getCategories,
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
];
