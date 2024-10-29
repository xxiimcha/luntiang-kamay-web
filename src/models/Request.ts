import mongoose, { Schema, Document } from "mongoose";

export interface RequestDocument extends Document {
  userId: mongoose.Types.ObjectId | string;
  seedType: string;
  description: string;
  status: string;
  createdAt: Date;
}

const RequestSchema = new Schema<RequestDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seedType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Explicitly specify the collection name as "seedrequests"
const Request = mongoose.models.Request || mongoose.model<RequestDocument>("Request", RequestSchema, "seedrequests");

export default Request;
