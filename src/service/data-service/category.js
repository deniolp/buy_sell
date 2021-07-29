'use strict';

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.category;
  }

  findAll() {
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
