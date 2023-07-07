import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    o_size: String,
    o_category: String,
    o_colour: String,
    o_quantity: Number,
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Pending", "Completed", "Processing", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderItem", orderItemSchema);
