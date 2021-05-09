var express = require("express");
var router = express.Router();

var [
  getUsers,
  getUser,
  getUserByUsername,
  login,
  insertUser,
  updateUser,
  deleteUser,
] = require("../controllers/user");

const userLogic = require("../logic/userLogic");

router.post("/login", async function (req, res, next) {
  try {
    const authUser = await login(req.body);
    authUser.success = true;
    res.send(authUser);
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});

router.get("/:id", async function (req, res, next) {
  const user = await getUser(req.params.id);

  if (user === null)
    return res
      .status(404)
      .send(
        "The user with the given id was not found. " +
          req.params.id +
          typeof req.params.id
      );

  res.send(user);
});

router.post("/username", async function (req, res, next) {
  const user = await getUserByUsername(req.body);
  if (user === null)
    return res.status(200).send({
      exists: false,
    });
  user.exists = true;
  res.send(user);
});

router.post("/", async function (req, res, next) {
  const { error } = userLogic.validateUser(req.body);

  if (error) {
    return res.status(200).send({
      create: false,
      message: error.details[0].message,
    });
  }

  try {
    const newUser = await insertUser(req.body);
    newUser.create = true;
    res.send(newUser);
  } catch (error) {
    res.status(200).json({
      create: false,
      message: error.message,
    });
  }
});

router.put("/:id", async function (req, res) {
  const { error } = userLogic.validateUser(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const user = await getUser(req.params.id);

  if (user === null) return res.status(404).send("The user was not found.");

  const newUser = await updateUser(req.params.id, req.body);
  res.send({ user: "User updated" });
});

router.delete("/:id", async function (req, res) {
  const user = await getUser(req.params.id);

  if (user === null) return res.status(404).send("The user was not found.");

  const delUser = await deleteUser(req.params.id);
  res.status(204).send();
});

module.exports = router;
