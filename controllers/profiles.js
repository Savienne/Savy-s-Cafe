import { Profile } from '../models/profile.js'


function index(req, res) {
    Profile.find({})
    .then(profiles => {
      res.render('profiles/index', {
        profiles,
              title: ""
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  }

  function show(req, res) {
    Profile.findById(req.params.id)
    .then((profile) => {
      const isSelf = profile._id.equals(req.user.profile._id)
      console.log(profile.reviews)
      res.render("profiles/show", {
        title: ` ${profile.name}'s profile`,
        profile,
        isSelf,
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect("/")
    })
  } 

  function createReview(req, res) {
    req.body.wouldRecommend = !! req.body.wouldRecommend
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.reviews.push(req.body)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  }

  function deleteReview(req, res) {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.reviews.remove({_id: req.params.id})
      profile.save()
      .then(()=> {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  }
export {
  index,
  show,
  createReview,
  deleteReview,
}