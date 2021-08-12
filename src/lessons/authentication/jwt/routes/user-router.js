
'use strict';

const {Router} = require(`express`);
const jwt = require(`jsonwebtoken`);
const {StatusCodes} = require(`http-status-codes`);

const storeService = require(`../services/store-service`);
const refreshTokenService = require(`../services/refresh-token-service`);
const authenticate = require(`../middleware/authenticate`);
const authenticateJwt = require(`../middleware/authenticate-jwt`);
const {makeTokens} = require(`../jwt-helper`);
const {JWT_REFRESH_SECRET} = require(`../constants`);

const userRouter = new Router();

userRouter.post(`/login`, authenticate(storeService), async (req, res) => {
  const {id} = res.locals.user;
  const {accessToken, refreshToken} = makeTokens({id});

  await refreshTokenService.add(refreshToken);
  res.json({accessToken, refreshToken});
});


userRouter.post(`/refresh`, async (req, res) => {
  const {token} = req.body;

  if (!token) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const existToken = await refreshTokenService.find(token);

  if (!existToken) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  return jwt.verify(token, JWT_REFRESH_SECRET, async (err, userData) => {
    if (err) {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    const {id} = userData;
    const {accessToken, refreshToken} = makeTokens({id});

    await refreshTokenService.drop(existToken);
    await refreshTokenService.add(refreshToken);

    return res.json({accessToken, refreshToken});
  });
});

userRouter.delete(`/logout`, authenticateJwt, (req, res) => {
  const {token} = req.body;
  refreshTokenService.drop(token);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = userRouter;
