const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: true
  },
},
  { timestamps: true }
);

const conversationModel = mongoose.model('conversation', conversationSchema);
export default conversationModel;