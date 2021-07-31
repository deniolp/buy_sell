'use strict';

const {Op} = require(`sequelize`);

const Aliase = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `data-service-offer`});

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.offer;
    this._Comment = sequelize.models.comment;
    this._Category = sequelize.models.category;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async drop(id) {
    const deletedRow = await this._Offer.destroy({
      where: {id}
    });
    return !!deletedRow;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    const offers = await this._Offer.findAll({include});
    return offers.map((item) => item.get());
  }

  findOne(id, needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    return this._Offer.findByPk(id, {include});
  }

  async update(id, offer) {
    try {
      const [affectedRows] = await this._Offer.update(offer, {
        where: {id},
      });
      const offerCategories = await this._Category.findAll({
        where: {
          id: {
            [Op.or]: offer.categories,
          },
        }
      });
      const updatedOffer = await this._Offer.findByPk(id);
      await updatedOffer.setCategories(offerCategories);

      return !!affectedRows;
    } catch (error) {
      return logger.error(error);
    }
  }

}

module.exports = OfferService;
