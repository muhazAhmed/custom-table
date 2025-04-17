import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const DynamicDataSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("DynamicData", DynamicDataSchema);
