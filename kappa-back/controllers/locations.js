const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_SERVICES = "services";

// Creates a new Service
function addService(newService) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_SERVICES)
      .insertOne({
        name: newService.name,
      })
      .finally(() => client.close());
  });
}

module.exports = [addService];
