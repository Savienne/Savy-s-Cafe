import mongoose from 'mongoose'

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  review: String,
  wouldRecommend: Boolean,
  location: String,
  Feedback: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true
})
const Restaurant = mongoose.model('Restaurant', restaurantSchema)
export {
  Restaurant
}