/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as jobController from '../controllers/users.controller'
const router = Router()

router.get('/', jobController.getUser)
router.put('/edit/:id', jobController.editUser)
router.get('/:id', jobController.findUser)
router.delete('/delete/:id', jobController.deleteUser)

export default router
