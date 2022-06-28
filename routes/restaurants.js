import { Router } from 'express'
import * as restaurantsCtrl from '../controllers/restaurant.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()
//get request
router.get('/', restaurantsCtrl.index)
router.post('/', restaurantsCtrl.create)//post request.islogged in protects route
router.get('/:id', restaurantsCtrl.show)
router.post('/', isLoggedIn, restaurantsCtrl.create)
router.patch('/:id/would-Recommend', isLoggedIn, restaurantsCtrl.wouldRecommend)
router.get('/:id/edit', isLoggedIn, restaurantsCtrl.edit)
router.put('/:id', isLoggedIn, restaurantsCtrl.update)
router.delete('/:id', isLoggedIn, restaurantsCtrl.delete)
export {
  router
}