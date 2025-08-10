import express from "express";
import {
  shortenUrl,
  redirectUrl,
  getUrlInfo
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/api/shorten", shortenUrl);
router.get("/api/info/:shortId", getUrlInfo);
router.get("/:shortId", redirectUrl);

export default router;
