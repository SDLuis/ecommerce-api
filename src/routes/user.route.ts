/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as jobController from '../controllers/users.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'
const router = Router()

router.get('/', authController.auth, policies.Admin, jobController.getUser)
router.put('/edit/:id', authController.auth, policies.Admin, jobController.editUser)
router.get('/find/:email', authController.auth, policies.Admin, jobController.findUserByEmail)
router.get('/:id', authController.auth, policies.Admin, jobController.findUser)
router.delete('/delete/:id', authController.auth, policies.Admin, jobController.deleteUser)

export default router
