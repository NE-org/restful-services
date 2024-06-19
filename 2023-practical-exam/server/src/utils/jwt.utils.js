import { config } from "dotenv";
config({ path: "./.env" });
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_KEY || '';

export const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token) => {
  token = token.replace("Bearer", "").trim();
  return jwt.verify(token, secret);
};
