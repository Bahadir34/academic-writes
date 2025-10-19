import express from "express";
import {
  getAllAssays,
  getAssayCategories,
  getAssaysByCategories,
  getAssaysViaSearchParam,
  saveAssay,
} from "../controller/assayController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const assayRouter = express.Router();

assayRouter
  .get("/get-all-assays", getAllAssays)
  .post(
    "/save-assay",
    tokenValidation,
    upload.fields([{ name: "pdfFile", maxCount: 1 }]),
    saveAssay
  )
  .get("/get-assay", getAssaysByCategories)
  .get("/get-assay-categorise", getAssayCategories)
  .get("/get-assays-via-search-param", getAssaysViaSearchParam);

export default assayRouter;
