'use strict';

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const Aliase = require(`./aliase`);

class OfferCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);

  Offer.hasMany(Comment, {
    as: Aliase.COMMENTS,
    foreignKey: `offerId`
  });
  Comment.belongsTo(Offer, {
    foreignKey: `offerId`
  });

  OfferCategory.init({}, {
    sequelize,
    modelName: `offers_categories`,
  });

  Offer.belongsToMany(Category, {
    through: `offers_categories`,
    as: Aliase.CATEGORIES
  });
  Category.belongsToMany(Offer, {
    through: `offers_categories`,
    as: Aliase.OFFERS
  });
  Category.hasMany(OfferCategory, {
    as: Aliase.OFFERS_CATEGORIES
  });

  return {Category, Comment, Offer, OfferCategory};
};

module.exports = define;
