'use strict';

const {Router} = require(`express`);

const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (app, service, commentService) => {
  app.use(`/offers`, router);

  router.get(`/`, async (req, res) => {
    try {
      const offers = await service.findAll();
      res.status(HttpCode.OK)
      .json(offers);
    } catch (err) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = service.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
        .json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  router.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const existOffer = service.findOne(offerId);

    if (!existOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updatedOffer = service.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = service.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  router.get(`/:offerId/comments`, offerExist(service), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, offerExist(service), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  router.post(`/:offerId/comments`, [offerExist(service), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
