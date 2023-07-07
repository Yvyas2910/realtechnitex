import express from "express";
import { getUserControllers } from "../controllers/userControler.js";

const router = express.Router();

//router
//get user routes
router.get("/get-users", getUserControllers);

export default router;
