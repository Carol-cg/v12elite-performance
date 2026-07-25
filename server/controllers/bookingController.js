const Booking = require("../models/Booking");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
async function createBooking(req, res, next) {
  try {
    const {
      service,
      vehicle,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      service,
      vehicle,
      appointmentDate,
      appointmentTime,
      notes,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
}


  

async function getMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
  getMyBookings,
};

