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


const selectedDate = new Date(appointmentDate);
const today = new Date();

// Remove the time so we compare only the dates
today.setHours(0, 0, 0, 0);

if (selectedDate < today) {
  return res.status(400).json({
    success: false,
    message: "Appointment date cannot be in the past",
  });
}


const existingBooking = await Booking.findOne({
  appointmentDate: selectedDate,
  appointmentTime,
  status: { $ne: "cancelled" },
});

if (existingBooking) {
  return res.status(409).json({
    success: false,
    message: "This appointment time is already booked",
  });
}




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


if (booking.status === "cancelled") {
  return res.status(400).json({
    success: false,
    message: "Cancelled bookings cannot be modified",
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



