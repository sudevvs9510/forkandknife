import mongoose, { Schema } from "mongoose"

const tableSlotSchema = new Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Table"
  },
  slotDate: {
    type: Date,
    require: true 
  },
  slotStartTime: {
    type:String,
    required: true 
  },
  slotEndDate: {
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