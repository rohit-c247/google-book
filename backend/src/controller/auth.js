import User from "../model/user.js";
import { generateJWTToken } from "../common/jwt.js";

/**
 * redirect to provider (google)
 * @param { req, res }
 * @returns
 */
export const login = async (req, res) => {
  const { profile } = req.body;
  try {
    const { providerId, firstName, lastName, email, loginType, profileImage } =
      req.body;
    const userData = await User.find({ providerId: providerId });

    if (userData.length == 0) {
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        providerId: providerId,
        loginType: loginType || "",
        profileImage: profileImage || "",
      });
    }
    let data = {
      providerId,
      firstName,
      lastName,
      email,
      loginType,
      profileImage,
    };
    const token = await generateJWTToken(providerId);
    return res.status(200).send({ auth: true, token: token, data: data });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
