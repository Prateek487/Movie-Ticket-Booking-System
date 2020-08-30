const Booking = require("../models/booking.models.js");

exports.findAll = (req, res) => {
    Booking.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

  exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const booking = new Booking({
      name: req.body.name,
      phone: req.body.phone,
      timing: req.body.timing
    });
    Booking.checkForTiming(req.body.timing, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bookings with timing ${req.params.timing}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Bookings with timing " + req.body.timing
          });
        }
      } else {
        if(data == 1 || data == 0){
          if(data == 1){
            res.status(500).send({
              message: "Tickets are full for: " + req.body.timing
            });
          }
          if(data == 0){
            res.status(500).send({
              message: "Tickets are Expired for time : " + req.body.timing
            });
          }
        }
        else{
          Booking.create(booking, (err1, data1) => {
            if (err1)
              res.status(500).send({
                message:
                  err1.message || "Some error occurred while creating the Customer."
              });
            else res.send(data1);
          });
        }
      }
    });
    
  };
  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Booking.updateById(
      req.params.booking_id,
      new Booking(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Booking with id ${req.params.booking_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Booking with id " + req.params.booking_id
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.findOne = (req, res) => {
    Booking.findById(req.params.bookingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.bookingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Booking with id " + req.params.bookingId
          });
        }
      } else res.send(data);
    });
  };
  exports.delete = (req, res) => {
    Booking.remove(req.params.bookingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Booking with id ${req.params.bookingId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Booking with id " + req.params.bookingId
          });
        }
      } else res.send({ message: `Booking was deleted successfully!` });
    });
  };
  exports.findAllBytiming = (req, res) => {
    Booking.findBytiming(req.params.timing, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bookings with timing ${req.params.timing}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Bookings with timing " + req.params.timing
          });
        }
      } else res.send(data);
    });
  };