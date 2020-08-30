module.exports = app => {
    const Booking = require("../controllers/booking.controllers.js");
    app.get("/bookings", Booking.findAll);
    app.post("/bookings", Booking.create);
    app.put("/bookings/:booking_id", Booking.update);
    app.get("/bookings/:bookingId", Booking.findOne);
    app.get("/bookings/timing/:timing", Booking.findAllBytiming);
    app.delete("/bookings/:bookingId", Booking.delete);
};
