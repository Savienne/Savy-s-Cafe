import { Restaurant } from '../models/restaurant.js'

function index(req, res) {
  Restaurant.find({})
  .then(restaurants => {
    res.render('restaurants/index', {
      restaurants,
      title: "",
      user: req.user,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function create(req, res) {
    req.body.owner = req.user.profile._id 
    req.body.wouldRecommend = !!req.body.wouldRecommend
    Restaurant.create(req.body) 
    .then(restaurant => {
      res.redirect('/restaurants')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/restaurants')
    })
  }

  function show(req, res) {
    Restaurant.findById(req.params.id)
    .populate("owner")
    .then(restaurant => {
      res.render('restaurants/show', {
        restaurant,
        title: "show"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/restaurants')
    })
  }

  function flipwouldRecommend(req, res) {
    Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.wouldRecommend = !restaurant.wouldRecommend
      restaurant.save()
      .then(()=> {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/restaurants')
    })
  }
  function edit(req, res) {
    Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.render('restaurants/edit', { 
        restaurant,
        title: "edit "
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/restaurant')
    })
  }

function update(req, res) {
  Restaurant.findById(req.params.id)
  .then(restaurant => {
    if (restaurant.owner.equals(req.user.profile._id)) {
      req.body.wouldRecommend = !!req.body.wouldRecommend
      restaurant.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/restaurants`)
  })
}
function deleteRestaurant(req, res) {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      if (restaurant.owner.equals(req.user.profile._id)) {
        restaurant.delete()
        .then(() => {
          res.redirect('/restaurants')
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }   
    })
    .catch(err => {
      console.log(err)
      res.redirect('/restaurants')
    })
  }

export {
    index,
    create,
    show,
    flipwouldRecommend,
    edit,
    update,
    deleteRestaurant as delete,
}