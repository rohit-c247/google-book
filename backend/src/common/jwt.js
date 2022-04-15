import jsonwebtoken from "jsonwebtoken";
import { secret } from "../config/loadSecrete.js";

/**
 * Generates JWT Token
 */
export const generateJWTToken = (providerId) => {
  const token = jsonwebtoken.sign({ providerId: providerId }, secret, {
    expiresIn: 86400,
  });
  return token;
};

export const verifyJWTToken = (token) => {
  try {
    const tokenInfo = jsonwebtoken.verify(token, secret);
    return tokenInfo;
  } catch {
    return false;
  }
};
