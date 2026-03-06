const prisma = require('../config/db');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { date, slots, totalPrice } = req.body;

    if (!date || !slots || !totalPrice) {
        return res.status(400).json({ message: 'Missing required booking parameters' });
    }

    try {
        // Double-booking check: find all confirmed bookings for this date
        const existingBookings = await prisma.booking.findMany({
            where: {
                date,
                status: 'confirmed'
            }
        });

        // Flatten all occupied slots
        const occupiedSlots = existingBookings.flatMap(b => {
            try {
                return Array.isArray(b.slots) ? b.slots : JSON.parse(b.slots);
            } catch (e) {
                return [];
            }
        });

        // Check for overlap
        const hasOverlap = slots.some(slot => occupiedSlots.includes(slot));
        if (hasOverlap) {
            return res.status(400).json({ message: 'One or more selected slots are no longer available' });
        }

        const booking = await prisma.booking.create({
            data: {
                userId: req.user.id,
                date,
                slots, // Prisma handles Json type
                totalPrice,
                status: 'confirmed'
            }
        });

        res.status(201).json({
            message: 'Booking established successfully',
            booking
        });
    } catch (error) {
        console.error('[BOOKING CONTROLLER] Error in createBooking:', error);
        res.status(500).json({ message: 'Server error while establishing booking' });
    }
};

// Get bookings for the authenticated user
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('[BOOKING CONTROLLER] Error in getUserBookings:', error);
        res.status(500).json({ message: 'Server error while fetching history' });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        // Ensure the booking belongs to the user
        const booking = await prisma.booking.findFirst({
            where: {
                id: parseInt(id),
                userId: req.user.id
            }
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: { status: 'cancelled' }
        });

        res.status(200).json({
            message: 'Booking cancelled successfully',
            booking: updatedBooking
        });
    } catch (error) {
        console.error('[BOOKING CONTROLLER] Error in cancelBooking:', error);
        res.status(500).json({ message: 'Server error while cancelling' });
    }
};

// Get all booked slots for a specific date
exports.getBookedSlots = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date parameter is required' });
    }

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                date,
                status: 'confirmed'
            },
            select: { slots: true }
        });

        // Flatten the slots array
        const bookedSlots = bookings.flatMap(b => {
            try {
                return Array.isArray(b.slots) ? b.slots : JSON.parse(b.slots);
            } catch (e) {
                return [];
            }
        });

        res.status(200).json(bookedSlots);
    } catch (error) {
        console.error('[BOOKING CONTROLLER] Error in getBookedSlots:', error);
        res.status(500).json({ message: 'Server error while fetching availability' });
    }
};
