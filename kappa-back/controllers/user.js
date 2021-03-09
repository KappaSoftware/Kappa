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
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
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
            email: body.email,
            role: body.role,
            password: body.password,
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
