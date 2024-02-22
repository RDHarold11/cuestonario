import mongoose, { Schema } from "mongoose";

const questionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Array,
      default: ["Yes", "No"],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Questions", questionsSchema);
export default Question;
