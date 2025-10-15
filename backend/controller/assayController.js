import { Assay } from "../entities/assayEntity.js";
import { upload } from "../utils/cloudinary.js";

export const getAllAssays = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Get All Assays",
  });
};

export const saveAssay = async (req, res, next) => {
  const savedBy = req.user;
  console.log(req.files);
  console.log("REQ.BODY : ", req.body);

  const tags = req.body?.tags.split(",");

  // assay olusturulmadan once assay yuklenmesi lazim.
  // assay i cloudinary ye yukle
  const assay = await upload(next, req.files.pdfFile[0].path, "assays");

  console.log("UPLOADED FILE TO CLOUDINARY : ", assay);

  const data = {
    category: req.body.category,
    subCategory: req.body?.subCategory,
    tags: tags,
    readsCount: 0,
    writedBy: req.user._id,
    pdfFile: assay.secure_url,
  };
  const savedAssay = await Assay.create(data);

  return res.status(201).json({
    success: true,
    message: "Saved assay!",
    data: savedAssay,
  });
};
