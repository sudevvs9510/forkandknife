import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  reviewId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: ObjectId,
    ref: 'Users',
    required: true
  },
  restaurantId: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true

  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5 
  },
}, {
  timestamps: true 
});

const reviewModel = mongoose.model('Reviews', reviewSchema);
export default reviewModel;
