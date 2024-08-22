import mongoose, { Schema , Types } from "mongoose"


const restaurantTimeSlotsSchema = new Schema ({
  restaurantId: {
    type: Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  slotStartTime:{
    type: String,
    required: true
  },
  slotEndTime: {
    type: String,
    required: true
  },
})


const restaurantTimeSlotsModel = mongoose.model("Timeslot",restaurantTimeSlotsSchema)

export default restaurantTimeSlotsModel