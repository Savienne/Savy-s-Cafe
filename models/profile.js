import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
 name: String,
 location: String,
 reviewedBy: String,
 wouldReccomend: Boolean,
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
