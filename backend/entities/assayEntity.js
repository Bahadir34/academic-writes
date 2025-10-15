import mongoose, { model, Schema } from "mongoose";

const assaySchema = new Schema(
  {
    pdfFile: {
      type: String,
      required: [true, "Load pdf!"],
      default : "http://example.pdf"
    },
    category: {
      type: String,
      enum: [
        "Math",
        "Literature",
        "Biology",
        "Physic",
        "Chemistry",
        "Philosophy",
        "Religion",
        "History",
        "Geography",
      ],
      required: [true, "Enter category"],
    },
    subCategory: {
      type: String,
    },

    tags: {
      type: [String],
    },

    readsCount: {
      type: Number,
    },

    writedBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Assay = model("Assay", assaySchema);
