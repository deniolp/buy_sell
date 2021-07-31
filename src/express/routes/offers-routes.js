'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {getAPI} = require(`../api`);
const {getLogger} = require(`../../service/lib/logger`);
const {ensureArray} = require(`../../service/utils`);

const UPLOAD_DIR = `../upload/img/`;

const logger = getLogger({name: `offers-routes`});
const offersRouter = new Router();
const api = getAPI();
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`new-offer`, {categories});
});

offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const offer = await api.getOffer(id, true);
  res.render(`offer`, {offer});
});

offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`, {});
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offer-edit`, {offer, categories, id});
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.description,
    title: body[`title`],
    categories: ensureArray(body.categories),
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (err) {
    logger.error(err);
    res.redirect(`back`);
  }
});

offersRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const offerData = {
    picture: file ? file.filename : body[`old-image`],
    sum: body.price,
    type: body.action,
    description: body.description,
    title: body[`title`],
    categories: ensureArray(body.categories),
  };
  try {
    await api.editOffer(id, offerData);
    res.redirect(`/my`);
  } catch (err) {
    logger.error(err);
    res.redirect(`back`);
  }
});

module.exports = offersRouter;
