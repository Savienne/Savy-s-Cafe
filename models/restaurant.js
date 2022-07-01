import mongoose from 'mongoose'

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  review: String,
  wouldRecommend: String,
  location: String,
  Feedback: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}//referencingtaco has single owner
},{
  timestamps: true
})
const Restaurant = mongoose.model('Restaurant', restaurantSchema)
export {
  Restaurant
}