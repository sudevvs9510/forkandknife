import mongoose, { Schema } from "mongoose"

const tableSlotSchema = new Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Table",
    required: true
  },
  slotDate: {
    type: Date,
    required: true 
  },
  slotStartTime: {
    type:String,
    required: true 
  },
  slotEndTime: {
    type: String,
    required: true
  },
  isAvailable:{
    type: Boolean,
    default: true 
  },
  
})

const tableSlotsModel = mongoose.model("TableSlots", tableSlotSchema)
export default tableSlotsModel