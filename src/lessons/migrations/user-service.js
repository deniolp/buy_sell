'use strict';

const UserModel = require(`./user-model`);

class UserService {
  async getUsers() {
    const users = await UserModel.findAll({raw: true});
    return users;
  }

  async registerUser(name, email, password, phone) {
    const user = await UserModel.create({name, email, password, phone});
    return user;
  }

  async dropUser(id) {
    const deletedRow = await UserModel.destroy({
      where: {id}
    });
    return !!deletedRow;
  }
}

module.exports = UserService;
