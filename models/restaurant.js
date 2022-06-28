import mongoose from 'mongoose'

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  // addedBy: {type: String},
  review: String,
  wouldRecommend: Boolean,
  location: String,
  Feedback: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}//referencingtaco has single owner
  //multiple owners is array[]
  //use 5 step process//as user and guess see all tacos
},{
  timestamps: true
})
const Restaurant = mongoose.model('Restaurant', restaurantSchema)
export {
  Restaurant
}