'use strict';

class CommentService {
  constructor(sequelize) {
    this._Offer = sequelize.models.offer;
    this._Comment = sequelize.models.comment;
  }

  async create(offerId, comment) {
    const newComment = await this._Comment.create({
      offerId,
      ...comment
    });

    return newComment;
  }

  async drop(id) {
    const deletedRow = await this._Comment.destroy({
      where: {id}
    });
    return !!deletedRow;
  }

  async findAll(offerId) {
    return await this._Comment.findAll({
      where: {offerId},
      raw: true
    });
  }

}

module.exports = CommentService;
