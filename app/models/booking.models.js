const sql = require('./db.js');
const Booking = function(booking){
    this.name = booking.name;
    this.phone = booking.phone;
    this.timing = booking.timing;

};
Booking.getAll = result => {
    sql.query("SELECT * FROM booking", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("bookings", res);
      result(null, res);
    });
  };
  Booking.create = (newBooking, result) => {
    sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created booking: ", { id: res.insertId, ...newBooking });
      result(null, { id: res.insertId, ...newBooking });
    });
  };
  Booking.updateById = (id, booking, result) => {
  sql.query(
    "UPDATE booking SET timing = ? WHERE booking_id = ?",
    [ booking.timing, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};
Booking.findById = (bookingId, result) => {
  sql.query(`SELECT * FROM booking WHERE booking_id = ${bookingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
Booking.findBytiming = (timing, result) => {
  sql.query(`SELECT * FROM booking WHERE timing = '${timing}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
Booking.remove = (id, result) => {
  sql.query("DELETE FROM booking WHERE booking_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};
Booking.checkForTiming = (timing, result) => {
  //if(timing)
  var curdt = new Date();
  var dt = new Date(timing);
  curdt.setHours(curdt.getHours() + 8);
  if(curdt > dt){
    console.log("Ticket Expired");
    result(null,0);
    return;
  }
  sql.query(`SELECT * FROM booking WHERE timing = '${timing}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length >= 20) {
      console.log("HouseFull");
      result(null, 1);
      return;
    }
    
    console.log("Tickets are available");
    result(null, 2);
  });
};


  module.exports = Booking;