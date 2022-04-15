import { query } from "express-validator";
import { param } from "express-validator";
export const HandelSearchValidation = [
  query("search").not().isEmpty().withMessage("Search is required"),
];

export const HandelDetailValidation = [
  param("id").not().isEmpty().withMessage("Book id is required"),
];
