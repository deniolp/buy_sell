'use strict';

const {Router} = require(`express`);

const UserService = require(`./user-service`);

const router = new Router();

const userService = new UserService();

router.get(`/`, async (req, res) => {
  const users = await userService.getUsers();
  res.send(users);
});

router.post(`/register`, async (req, res) => {
  const {name, email, password, phone = null} = req.body;
  const user = await userService.registerUser(name, email, password, phone);
  res.send(user);
});

router.delete(`/:userId`, async (req, res) => {
  const {userId} = req.params;
  const isOfferDeleted = await userService.dropUser(userId);
  if (!isOfferDeleted) {
    return res.status(404)
      .send(`User not found`);
  }

  return res.status(200).send(`User was deleted!`);
});

module.exports = router;
