import { Router } from 'express'
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()
//get request
router.get('/', restaurantsCtrl.index)
router.post('/', isLoggedIn, restaurantsCtrl.create)
router.get('/:id', restaurantsCtrl.show)
router.patch('/:id/wouldRecommend', isLoggedIn, restaurantsCtrl.wouldRecommend)
router.get('/:id/edit', isLoggedIn, restaurantsCtrl.edit)
router.put('/:id', isLoggedIn, restaurantsCtrl.update)
router.delete('/:id', isLoggedIn, restaurantsCtrl.delete)
export {
  router
}