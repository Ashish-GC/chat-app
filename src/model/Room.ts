import mongoose, { Schema } from "mongoose";


export const roomSchema = new Schema({
  name: { type: String, required: true, unique: true },
  contacts: { type: [{ type: String }], required: true },
});

export const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
