import { verifyJWTToken } from "../common/jwt.js";
/**
 * verifies token
 */
export const verifyToken = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const userInfo = await verifyJWTToken(token);

  if (userInfo) {
    req.providerId = userInfo.providerId;
    next();
  } else {
    return res
      .status(422)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
};
