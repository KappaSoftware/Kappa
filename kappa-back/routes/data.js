var express = require("express");
var router = express.Router();

var [
  getTotalData,
  getDataFiltered,
  getTotalDataLookupSubcategory,
  getDataWithSubcategory,
  getDataWithSubcategoryLookupSubcategory,
  getOneData,
  insertData,
  updateData,
  deleteData,
] = require("../controllers/data");

router.get("/", async function (req, res, next) {
  const totalData = await getTotalData();
  res.send(totalData);
});

router.get("/filtered", async function (req, res, next) {
  const totalData = await getDataFiltered();
  res.send(totalData);
});

router.get("/lookup/subcategory", async function (req, res, next) {
  const totalData = await getTotalDataLookupSubcategory();
  res.send(totalData);
});

router.get("/lookup/subcategory/:id", async function (req, res, next) {
  const getDataWithSubcategory = await getDataWithSubcategoryLookupSubcategory(
    req.params.id
  );
  res.send(getDataWithSubcategory);
});

router.get("/subcategory/:id", async function (req, res, next) {
  const data = await getDataWithSubcategory(req.params.id);

  if (data === null)
    return res
      .status(404)
      .send(
        "The data with the given subcategory id was not found. " +
          req.params.id +
          typeof req.params.id
      );

  res.send(data);
});

router.get("/:id", async function (req, res, next) {
  const data = await getOneData(req.params.id);

  if (data === null)
    return res
      .status(404)
      .send(
        "The data with the given id was not found. " +
          req.params.id +
          typeof req.params.id
      );

  res.send(data);
});

router.post("/", async function (req, res, next) {
  const newData = await insertData(req.body);
  res.send(newData);
});

router.put("/:id", async function (req, res) {
  const data = await getOneData(req.params.id);

  if (data === null) return res.status(404).send("The data was not found.");

  const newData = await updateData(req.params.id, req.body);
  res.send({ data: "Data updated" });
});

router.delete("/:id", async function (req, res) {
  const data = await getOneData(req.params.id);

  if (data === null) return res.status(404).send("The data was not found.");

  const delData = await deleteData(req.params.id);
  res.status(204).send();
});

module.exports = router;
