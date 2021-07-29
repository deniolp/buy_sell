'use strict';

class CommentService {
  constructor(sequelize) {
    this._Offer = sequelize.models.offer;
    this._Comment = sequelize.models.comment;
  }

  async create(offerId, comment) {
    return this._Comment.create({
      offerId,
      ...comment
    });
  }

  drop(commentId) {
    const deletedRow = this._Comment.destroy({
      where: {commentId}
    });
    return !!deletedRow;
  }

  findAll(offerId) {
    return this._Comment.findAll({
      where: {offerId},
      raw: true
    });
  }

}

module.exports = CommentService;
