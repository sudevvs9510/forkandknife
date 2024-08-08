import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const bookingSchema = new Schema({
  bookingId: {
    type: String,
    require: true,
    unique : true
  },
  userId: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  tableId: {
    type: ObjectId,
    ref: "Table",
    required: true,
  },
  restaurantId: {
    type: ObjectId,
    ref: "Restaurant",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  bookingTime: {
    type: String,
    required : true
  },
  paymentMethod :{
    type: String,
    enum : ["Online" , "Wallet"]
  },
  paymentStatus: {
    type: String,
    enum: ["PAID", "PENDING", "FAILED", "REFUNDED"],
    default: "PENDING",
  },
  bookingStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED" , "CHECKED IN"],
    default: "PENDING",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
},{
  timestamps: true
});

const bookingModel = mongoose.model("bookings", bookingSchema);
export default bookingModel;
