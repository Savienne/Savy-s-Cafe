import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewsSchema = new Schema ({
 name: String,
 location: Number,
 reviewedBy: String,
 wouldReccomend: Boolean,
 generalFeedback: String,

},{
  timestamps: true
})
const profileSchema = new Schema({
  name: String,
  avatar: String,
  review: [reviewsSchema],
}, {
  timestamps: true
})


const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
