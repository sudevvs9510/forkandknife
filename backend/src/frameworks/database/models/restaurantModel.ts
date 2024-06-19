import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller"],
      default: "seller",
    },
    address: String,
    description: String,
    tableRatePerPerson: {
      type: Number,
      default: 200,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    openingTime: String,
    closingTime: String,
    qrCode: String,
    isListed: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    primaryImage: String,

    secondaryImages: [
      {
        type: String,
      },
    ],
    verificationToken: String,
  },
  { timestamps: true }
);


restaurantSchema.pre("save", async function(next){
  this.updatedAt = new Date()
  // if (this.isModified('password') || this.isNew) {
     const hashedPassword = await bcrypt.hash(this.password,8);
     this.password = hashedPassword;
//  }
 next();
})

restaurantSchema.index({ location: "2dsphere" }); 

 const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
 export default restaurantModel;

