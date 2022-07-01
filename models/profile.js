import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
 name: String,
 location: String,
 reviewedBy: String,
 wouldRecommend: Boolean,
 generalFeedback: String,

},{
  timestamps: true
})
const profileSchema = new Schema({
  name: String,
  avatar: String,
  reviews: [reviewSchema],
}, {
  timestamps: true
})


const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
