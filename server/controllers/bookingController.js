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
// @desc    Get one booking belonging to the logged-in user
// @route   GET /api/bookings/:id
// @access  Private
async function getBookingById(req, res, next) {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
}



// @desc    Update a booking belonging to the logged-in user
// @route   PATCH /api/bookings/:id
// @access  Private
async function updateBooking(req, res, next) {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const {
      service,
      vehicle,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    if (service !== undefined) {
      booking.service = service;
    }

    if (vehicle !== undefined) {
      booking.vehicle = {
        ...booking.vehicle.toObject(),
        ...vehicle,
      };
    }

    if (appointmentDate !== undefined) {
      booking.appointmentDate = appointmentDate;
    }

    if (appointmentTime !== undefined) {
      booking.appointmentTime = appointmentTime;
    }

    if (notes !== undefined) {
      booking.notes = notes;
    }

    const updatedBooking = await booking.save();

    res.status(200).json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
}


const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
};



