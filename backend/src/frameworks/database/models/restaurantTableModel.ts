import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

const restaurantTableSchema = new Schema ({
  restaurantId: {
    type: Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  tableNumber:{
    type: String,
    required: true
  },
  tableCapacity: {
    type: Number,
    required: true
  },
  tableLocation:{
    type: String,
    enum: ["Indoor", "Outdoor"],
    default: "Indoor",
    required: true
  }
})


const restaurantTableModel = mongoose.model("Table",restaurantTableSchema)

export default restaurantTableModel