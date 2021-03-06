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
    const {offset, limit, comments} = req.query;
    let result;

    try {
      if (limit || offset) {
        result = await service.findPage({limit, offset});
      } else {
        result = await service.findAll(comments);
      }

      res.status(HttpCode.OK).json(result);
    } catch (err) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const {comments} = req.query;
    const offer = await service.findOne(offerId, comments);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
        .json(offer);
  });

  router.post(`/`, offerValidator, async (req, res) => {
    const offer = await service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  router.put(`/:offerId`, offerValidator, async (req, res) => {
    const {offerId} = req.params;

    const isOfferUpdated = await service.update(offerId, req.body);

    if (!isOfferUpdated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).send(`Updated`);
  });

  router.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const isOfferDeleted = await service.drop(offerId);

    if (!isOfferDeleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer not found`);
    }

    return res.status(HttpCode.OK).send(`Deleted!`);
  });

  router.get(`/:offerId/comments`, offerExist(service), async (req, res) => {
    const {offerId} = req.params;
    const comments = await commentService.findAll(offerId);

    res.status(HttpCode.OK)
      .json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, offerExist(service), async (req, res) => {
    const {commentId} = req.params;
    const isCommentDeleted = await commentService.drop(commentId);

    if (!isCommentDeleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment not found`);
    }

    return res.status(HttpCode.OK).send(`Deleted!`);
  });

  router.post(`/:offerId/comments`, [offerExist(service), commentValidator], async (req, res) => {
    const {offerId} = req.params;
    const comment = await commentService.create(offerId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
