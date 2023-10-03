import express from 'express'
import { userLogin, userRegister, userTicket } from '../Controller/userController.js'


const router = express.Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/ticket/:id').get(userTicket)



export default router