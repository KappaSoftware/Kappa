const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:wkDcCjUFM3evmOrc@kappa.qosht.mongodb.net/kappaDB?retryWrites=true&w=majority";

const dataBase = "kappaDB";

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
