const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, cancelBooking, getBookedSlots } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getUserBookings);
router.get('/booked-slots', getBookedSlots); // Publicly accessible to show availability
router.put('/:id/cancel', authMiddleware, cancelBooking);

module.exports = router;
