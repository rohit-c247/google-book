import { Router } from "express";

import { login } from "../controller/auth.js";
import { HandelProfileValidation } from "../validation/profile.js";
import { handleValidationErrors } from "../middleware/validate.js";

const authRouter = Router();

authRouter.post(
  "/login",
  HandelProfileValidation,
  handleValidationErrors,
  login
);

export default authRouter;
