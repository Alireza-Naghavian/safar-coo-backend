import bcrypt from "bcrypt";
import { CookieOptions, Response } from "express";
import { sign } from "jsonwebtoken";
import { TokenOptions, Usertype } from "../@types/user.t";
import { ACCESSTOKENEXP, REFRESHTOKENEXP } from "./constants";
const saltRounds = 12;
const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: (process.env.NODE_ENV as string) === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
};

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (
  userPassword: string,
  hashedPassword: string
) => {
  const compare = await bcrypt.compare(userPassword, hashedPassword);
  return compare;
};

const tokenGenerator = ({
  email,
  tokenSectretKey,
  expiresIn,
}: TokenOptions) => {
  try {
    const token = sign({ email }, tokenSectretKey  as string,  {
        expiresIn
    });
    return token;
  } catch (error) {
    console.log("token generating failed", error);
  }
};


const setAccessToken = (res: Response, user: Usertype) => {
  const token = tokenGenerator({
    email: user.email,
    tokenSectretKey: process.env.AccessTokenSecretKey as string,
    expiresIn:ACCESSTOKENEXP,
  });
  if (token !== undefined) {
    return res.cookie("accessToken", token, {
      ...cookieOptions,
      maxAge: ACCESSTOKENEXP,
    });
  }
  return token
};
const setRefreshToken = async (res: Response, user: Usertype) => {
  const token = tokenGenerator({
    email: user.email,
    tokenSectretKey: process.env.RefreshTokenSecreKey as string,
    expiresIn:  REFRESHTOKENEXP,
  });
  if (token !== undefined) {
    return res.cookie("refreshToken", token, {
      ...cookieOptions,
      maxAge: REFRESHTOKENEXP,
    });
  }
  return token
};

export { comparePassword, hashPassword, setAccessToken, setRefreshToken };

