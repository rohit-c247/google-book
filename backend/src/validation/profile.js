import { body } from "express-validator";

export const HandelProfileValidation = [
  body("providerId").not().isEmpty().withMessage("provider ID is required"),
];
