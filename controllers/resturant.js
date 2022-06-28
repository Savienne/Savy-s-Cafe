import { Resturant } from '../models/resturant.js'


function index(req, res) {
    Resturant.find({})
    .then(resturants => {
      res.render('resturants/index', {
        resturants,
        title: "🌮",
        user: req.user,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function create(req, res) {
    req.body.owner = req.user.profile._id //connecting to protected route!
      req.body.tasty = !!req.body.tasty
    Resturant.create(req.body) //creating taco
    .then(resturant => {
      res.redirect('/resturants')//redirecting to tacos url . not using datda
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resturants')
    })
  }

  function show(req, res) {
    Resturant.findById(req.params.id)
    .populate("owner")//owner/name defined in model for show.ejs
    .then(resturant => {
      res.render('resturants/show', {
        resturant,
        title: "🌮 show"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resturants')
    })
  }

  function wouldRecommend(req, res) {
    Resturant.findById(req.params.id)
    .then(resturant => {
      resturant.wouldRecommend = !resturant.wouldRecommend
      resturant.save()
      .then(()=> {
        res.redirect(`/resturants/${resturant._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resturants')
    })
  }
  function edit(req, res) {
    Resturant.findById(req.params.id)
    .then(resturant => {
      res.render('resturants/edit', { //passing to edit page
        resturant,
        title: "edit 🌮"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resturants')
    })
  }

  //needs update to show changes

function update(req, res) {
  Resturant.findById(req.params.id)
  .then(resturant => {
    if (resturant.owner.equals(req.user.profile._id)) {
      req.body.tasty = !!req.body.tasty
      resturant.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/resturants/${resturant._id}`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/resturants`)
  })
}
function deleteResturant(req, res) {
    Resturant.findById(req.params.id)
    .then(resturant => {
      if (resturant.owner.equals(req.user.profile._id)) {
        resturant.delete()
        .then(() => {
          res.redirect('/resturants')
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }   
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resturants')
    })
  }

export {
    index,
    create,
    show,
    wouldRecommend,
    edit,
    update,
    deleteResturant as delete,
}
// router.get('/tacos', tacosCtrl.index)
// import * as tacosCtrl from '../controllers/tacos.js' //importing everything from tacos controller
//   console.log("TACOS 🌮") //test for console log


//singular when finding singular items
//plural when multiple
//similiar to new meal page where we we removed duplicates