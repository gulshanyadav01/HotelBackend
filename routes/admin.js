const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

const auth = require('../middleware/auth');

const admin = require('../middleware/admin');

router.post("/addHotel",  auth , admin ,   adminController.addHotel);

// all hotels when the user is login 

router.get("/allHotels", auth, adminController.AllHotels);


// get hotel by id 
router.get("/getHotelById/:id",  adminController.getHotelById);


// update hotel 

router.post("/updateHotelById/:id" ,   auth  , admin , adminController.addHotel);

// delete hotel 

router.post("/deleteById/:hotelId",  auth , admin ,  adminController.deleteHotelById);


// booking hotel 

router.post("/booking/:id", auth,  adminController.Booking);

// get all booking 

router.get("/getBooking/:id", auth,  adminController.getBooking);


// remove booking 

router.delete("/removeBooking/:id", auth,  adminController.deleteBooking);



module.exports = router