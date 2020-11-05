import * as express from "express";

import AuthController from "../controllers/authController/AuthController";

const authController = new AuthController();

const authRouter = express.Router();

authRouter.post("/signin", async (req: TSigninReq, res) => {
  const response = await authController.signin(req.body);
  res.status(response.status).send(response.data);
});
authRouter.post("/signup", async (req: TSignupReq, res) => {
  const response = await authController.signup(req.body);
  res.status(response.status).send(response.data);
});
authRouter.post("/refresh", async (req: TRefreshReq, res) => {
  const response = await authController.refresh(req.body);
  res.status(response.status).send(response.data);
});
authRouter.post("/logout", async (req: TLogoutReq, res) => {
  const response = await authController.logout(req.body);
  res.status(response.status).send(response.data);
});
export default authRouter;

type TSigninReq = express.Request<
  {},
  App.IControllerResponseData<{
    tokens: {
      access: string;
      refresh: string;
    };
  }>,
  {
    login: string;
    password: string;
    salt: string;
  }
>;
type TSignupReq = express.Request<
  {},
  App.IControllerResponseData,
  {
    login: string;
    password: string;
  }
>;
type TRefreshReq = express.Request<
  {},
  App.IControllerResponseData<{
    tokens: {
      access: string;
      refresh: string;
    };
  }>,
  {
    refresh: string;
  }
>;
type TLogoutReq = express.Request<
  {},
  App.IControllerResponseData<void>,
  {
    refresh: string;
  }
>;
