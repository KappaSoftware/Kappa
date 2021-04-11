const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "Users";

function getUsers() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getUser(userId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(userId) })
      .finally(() => client.close());
  });
}

function insertUser(newUser) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        username: newUser.username,
        passwd: newUser.passwd,
        tACWeb: false,
        tACWebBefore: false,
        tACTelegram: newUser.tACTelegram,
        tACTelegramBefore: false,
        creationDate: new Date(),
      })
      .finally(() => client.close());
  });
}

function updateUser(userId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(userId),
        },
        {
          $set: {
            username: body.username,
            passwd: body.passwd,
            tACWeb: body.tACWeb,
            tACWebBefore: body.tACWebBefore,
            tACTelegram: body.tACTelegram,
            tACTelegramBefore: body.tACTelegramBefore,
          },
        }
      )
      .finally(() => client.close());
  });
}

function deleteUser(userId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(userId) })
      .finally(() => client.close());
  });
}

module.exports = [getUsers, getUser, insertUser, updateUser, deleteUser];
