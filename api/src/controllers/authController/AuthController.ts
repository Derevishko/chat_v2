import * as express from "express";
import * as express_jwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as sha256 from "sha256";

import { Document, Error } from "mongoose";

import SessionModel from "../../models/sessionModel/SessionModel";
import UserModel from "../../models/userModel/UserModel";
import config from "../../config";

class AuthController {
  constructor() {}

  public async signin(
    data: AuthControllerNamespace.ISigninData
  ): AuthControllerNamespace.TSigninResponse {
    try {
      const findUserResponse = await UserModel.findOne({
        login: data.login,
      }).catch(() => null);

      if (!findUserResponse) throw new Error("Not correct login or password");
      const user: App.IUser = findUserResponse.toObject();
      if (sha256(user.password + data.salt) !== data.password) {
        throw new Error("Not correct login or password");
      }

      return {
        status: 200,
        data: {
          tokens: this.createTokens(user._id),
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: { error: error.message },
      };
    }
  }
  public async signup(
    data: AuthControllerNamespace.ISignupData
  ): AuthControllerNamespace.TSignupResponse {
    try {
      await new UserModel({
        login: data.login,
        password: data.password,
      }).save();
      return { status: 200, data: undefined };
    } catch (error) {
      return {
        status: 400,
        data: { error: error.message },
      };
    }
  }
  public async refresh(
    data: AuthControllerNamespace.IRefreshData
  ): AuthControllerNamespace.TRefreshResponse {
    try {
      jwt.verify(data.refresh, config.sectetKey);
      const payload = jwt.decode(data.refresh, {});
      if (typeof payload === "string") throw new Error("Not correct payload");
      return {
        status: 200,
        data: {
          tokens: this.createTokens(payload.userId),
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: { error: error.message },
      };
    }
  }
  public async logout(
    data: AuthControllerNamespace.ILogoutData
  ): AuthControllerNamespace.TLogoutResponse {
    // SessionModel.deleteOne({ token: data.refresh }).catch(() => false);
    return {
      status: 200,
      data: undefined,
    };
  }

  public async auth(
    req: express.Request<any, any, any, any>,
    res,
    next: () => void
  ) {
    next();
  }

  private createTokens(userId: string): AuthControllerNamespace.ITokens {
    const access = jwt.sign({ userId }, config.sectetKey, {
      expiresIn: config.expiresInAccessToken,
    });
    const refresh = jwt.sign({ userId }, config.sectetKey, {
      expiresIn: config.expiresInRefreshToken,
    });
    // new SessionModel({
    //   token: refresh,
    //   userId,
    // })
    //   .save()
    //   .catch(() => false);

    return { access, refresh };
  }
}

export default AuthController;
