import { Router } from "express";
import authRouter from "./auth.js";
import searchRouter from "./search.js";

import { verifyToken } from "../middleware/authenticate.js";

const router = Router();
router.use(authRouter);
router.use(verifyToken, searchRouter);

export default router;
