import { Router } from "express";

import { books, detail } from "../controller/search.js";
import {
  HandelSearchValidation,
  HandelDetailValidation,
} from "../validation/search.js";
import { handleValidationErrors } from "../middleware/validate.js";

const searchRouter = Router();

searchRouter.get(
  "/books",
  HandelSearchValidation,
  handleValidationErrors,
  books
);
searchRouter.get(
  "/book/:id",
  HandelDetailValidation,
  handleValidationErrors,
  detail
);

export default searchRouter;
