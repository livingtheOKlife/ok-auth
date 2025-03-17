import express from 'express'

const router = express.Router()

import {
  register,
  login,
  logout,
  update,
} from '../controllers/user.controller.js'

import { protect } from '../middleware/auth.middleware.js'

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.route('/profile').put(protect, update)

export default router
