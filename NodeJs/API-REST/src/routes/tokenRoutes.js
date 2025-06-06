import { Router } from "express";
import TokenController from "../controllers/TokenController";

const router = new Router();

/* Funções vão dentro do controller */
router.post("/", TokenController.store);

export default router;
