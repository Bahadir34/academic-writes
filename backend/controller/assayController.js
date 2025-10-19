import { Assay } from "../entities/assayEntity.js";
import firebaseApp from "../configs/firebase.js";
import { read } from "fs";
import { v4 } from "uuid";

export const getAllAssays = async (req, res) => {
  const assays = await Assay.find();

  if (!assays.length) {
    return res.status(404).json({
      success: false,
      message: "Could not find any assay!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Get All Assays",
    data: {
      length: assays.length,
      assays: assays,
    },
  });
};

export const saveAssay = async (req, res) => {
  const tags = req.body?.tags.split(",");

  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "Please add a pdf file!",
    });
  }

  const bucket = firebaseApp.storage().bucket();
  const [uploadedData] = await bucket.upload(req.files.pdfFile[0].path, {
    destination: v4() + req.files.pdfFile[0].originalname,
    metadata: {
      contentType: req.files.pdfFile[0].mimetype,
    },
  });

  await uploadedData.makePublic();

  const [url] = await uploadedData.getSignedUrl({
    action: "read",
    expires: Date.now() + 24 * 365 * 10 * 60 * 60 * 1000, // 10 sene
  });

  const data = {
    category: req.body.category,
    description: req.body.description,
    subCategory: req.body?.subCategory,
    tags: tags,
    readsCount: 0,
    writedBy: req.user._id,
    pdfFile: url,
  };
  const savedAssay = await Assay.create(data);

  return res.status(201).json({
    success: true,
    message: "Saved assay!",
    data: savedAssay,
  });
};

export const getAssaysByCategories = async (req, res) => {
  const filters = req.query;

  const assays = await Assay.find({ category: req.query.category }).populate(
    "writedBy",
    "firstName lastName email isActive"
  );

  if (!assays.length) {
    return res.status(404).json({
      success: false,
      message: `Could not find assays with ${req.query.category} key!`,
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      length: assays.length,
      assays: assays,
    },
  });
};

export const getAssayCategories = async (req, res) => {
  const assays = await Assay.find();

  if (!assays.length) {
    return res.status(404).json({
      success: false,
      message: "Could not find any assay and their categories!",
    });
  }

  console.log(assays.length);

  const data = assays.reduce((data, assay) => {
    if (!data[assay.category]) {
      data[assay.category] = 1;
    } else {
      data[assay.category] += 1;
    }

    return data;
  }, {});

  console.log(data);

  return res.status(200).json({
    success: true,
    message: "Fetched assays and their category count.",
    data,
  });
};

export const getAssaysViaSearchParam = async (req, res) => {
  console.log(req.query);
  if (!req?.query?.search) {
    return res.status(400).json({
      success: false,
      message: "Search param is not entered!",
    });
  }

  const assays = await Assay.find({
    description: { $regex: req.query.search, $options: "i" },
  });

  if (!assays.length) {
    return res.status(404).json({
      success: false,
      message: `Could not find any assay with ${req.query.search} key!`,
    });
  }

  return res.status(200).json({
    success: 200,
    message: "Assays fetched successfully!",
    data: assays,
    length: assays.length,
  });

  console.log(assays);
};
