import { Router } from "express";
import HomeController from "../controllers/HomeController";

const router = new Router();

/* Funções vão dentro do controller */
router.get("/", HomeController.index);

export default router;
