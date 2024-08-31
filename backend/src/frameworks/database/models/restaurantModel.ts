import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantType: {
      type: String,
      enum: ["Veg & Non-Veg", "Veg", "Non-Veg"]
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
    TableRate: {
      type: String,
      default : "100"
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
    place: {
      type: String,
      // required: true,
    },
    openingTime: String,
    closingTime: String,
    // qrCode: String,
    isBlocked: {
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
    featuredImage: String,

    secondaryImages: [String],
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

// restaurantSchema.index({ location: "2dsphere" }); 

 const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
 export default restaurantModel;

