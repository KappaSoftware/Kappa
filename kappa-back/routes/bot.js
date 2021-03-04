var express = require("express");
var router = express.Router();
const [addService] = require("../controllers/locations");

router.post("/", async function (req, res, next) {
  console.log(req.body);
  //const entrega = await addEntrega(req.body, actividadId, estudiante._id);
  res.send(req.body);
});

module.exports = router;
