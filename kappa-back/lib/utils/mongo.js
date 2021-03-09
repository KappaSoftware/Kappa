const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:XV1CLDFp7dumBnEn@kappa.qosht.mongodb.net/KappaDB?retryWrites=true&w=majority";

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
