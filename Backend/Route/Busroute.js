import express from 'express'
import { bookSeats, busDetailsContoller, createBusAvailability, findBusAvailable } from '../Controller/BusController.js'

const router = express.Router()

router.route('/create/available').post(createBusAvailability)
router.route('/ticket/booking').post(bookSeats)
router.route('/find/buses').post(findBusAvailable)
router.route('/details/:id').get(busDetailsContoller)




export default router