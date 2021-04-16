const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const auth = require("../lib/utils/auth.js");
const COLLECTION_NAME = "Users";
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

async function login(user) {
  return mongoUtils.conn().then(async (client) => {
    const requestedUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ username: user.username })
      .finally(() => client.close());
    const isValid = await bcrypt.compare(user.password, requestedUser.password);
    let currentUser = { ...requestedUser };
    if (isValid) {
      delete currentUser.password;
      let token = auth.createToken(currentUser);
      currentUser.token = token;
      return currentUser;
    } else {
      throw new Error("Authentication failed");
    }
  });
}

async function insertUser(user) {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  if (!user.tACTelegram) {
    user.tACTelegram = false;
  }
  return mongoUtils.conn().then(async (client) => {
    const newUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        username: user.username,
        password: user.password,
        tACWeb: false,
        tACWebBefore: false,
        tACTelegram: user.tACTelegram,
        tACTelegramBefore: false,
        creationDate: new Date(),
      })
      .finally(() => client.close());
    newUser && newUser.ops ? delete newUser.ops[0].password : newUser;
    return newUser.ops[0];
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
            password: body.password,
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

module.exports = [getUsers, getUser, login, insertUser, updateUser, deleteUser];
