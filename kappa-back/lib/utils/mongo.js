const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://myUserAdmin:123@aion.gnuve.org:27017/?authSource=admin";

const dataBase = "KappaDB";

function MongoUtils() {
  const mu = {};

  // Esta función retorna una nueva conexión a MongoDB.
  mu.conn = () => {
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.connect();
  };
  return mu;
}

process.on("SIGINT", async function () {
  const client = await MongoUtils().conn();
  client.close().then((data) => console.log("conn ended"));
});

exports.mongoUtils = MongoUtils();
exports.dataBase = dataBase;
