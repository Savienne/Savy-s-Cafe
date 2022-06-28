import { Router } from 'express'
import * as resturantsCtrl from '../controllers/resturants'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()
//get request
router.get('/', resturantsCtrl.index)
router.post('/', resturantsCtrl.create)//post request.islogged in protects route
router.get('/:id', resturantsCtrl.show)
router.post('/', isLoggedIn, resturantsCtrl.create)
router.patch('/:id/would-Recommend', isLoggedIn, resturantsCtrl.wouldRecommend)
router.get('/:id/edit', isLoggedIn, resturantsCtrl.edit)
router.put('/:id', isLoggedIn, resturantsCtrl.update)
router.delete('/:id', isLoggedIn, resturantsCtrl.delete)
export {
  router
}