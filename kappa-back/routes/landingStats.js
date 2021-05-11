var express = require("express");
var router = express.Router();

var [
  getUsersNumber,
  getCategoriesNumber,
  getSubcategoriesNumber,
] = require("../controllers/landingStat");

router.get("/", async function (req, res, next) {
  const usersNumber = await getUsersNumber();
  const categoriesNumber = await getCategoriesNumber();
  const subcategoriesNumber = await getSubcategoriesNumber();

  res.send({
    users: usersNumber,
    categories: categoriesNumber,
    subcategories: subcategoriesNumber,
  });
});

module.exports = router;
