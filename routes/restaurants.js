import { Router } from 'express'
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()
//get request
router.get('/', restaurantsCtrl.index)
router.get('/:id', restaurantsCtrl.show)
router.get('/:id/edit', isLoggedIn, restaurantsCtrl.edit)
router.post('/', isLoggedIn, restaurantsCtrl.create)
router.patch('/:id/flip-wouldRecommend', isLoggedIn, restaurantsCtrl.flipwouldRecommend)
router.put('/:id', isLoggedIn, restaurantsCtrl.update)
router.delete('/:id', isLoggedIn, restaurantsCtrl.delete)
export {
  router
}