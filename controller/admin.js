const { json } = require('body-parser');
const Hotel = require('../model/hotel');
const User = require("../model/user");

//Add Hotel
exports.addHotel = async (req, res, next) => { 
    const {hotelName , location , imageUrl , utilities , description} = req.body;
     try {
         const user = await User.findById(req.user.id);

         if(user.isAdmin === true) {
             const hotel = new Hotel({
                 hotelName,
                 location,
                 imageUrl,
                 utilities,
                 description,
                 user : req.user.id
             })
            await hotel.save();

            user.book.push(hotel._id)

            await user.save()

            res.status(200).json({msg:"New Hotel created"})
         } else {
             return res.status(401).json({msg:"Not Authorized"})
         }

     } catch (err) {
         console.log(err);
     }
}


//get Hotels

exports.AllHotels = async  (req, res , next) => {
  try {
     const hotel = await Hotel.find({});
    // console.log(req.user);
     res.status(200).json({hotel});
  } catch (err) {

  }
}

//getHotel by Id
//if user authenticateed then

exports.getHotelById = async (req, res, next ) => {
    try {
        
        const hotel = await Hotel.findById(req.params.id);

        if(!hotel) {
            return res.status(401).json({msg:"Hotel not found"})
        }

        res.status(200).json(hotel)

    } catch (err) {
       console.log(err)
    }
}

//update hotel

exports.updateHotelById = (req, res, next) => {
    const hotelId = req.params.hotelId; 
    const updatedName = req.body.hotelName;
    const updatedLocation =req.body.location;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedUtilities = req.body.utilities;

    Hotel.findById(hotelId)
    .then((hotel) => {
        hotel.hotelName = updatedName;
        hotel.imageUrl  = updatedImageUrl;
        hotel.description = updatedDescription;
        hotel.location = updatedLocation;
        hotel.utilities = updatedUtilities;
        return hotel.save();
    })
    .then(data => {
        res.status(201).json({message: "ho gya update", data: data})
    })
    .catch(err => {
        console.log(err);
    }) 

    
         
}



// exports.postEditProduct = (req, res, next) =>{
//     const prodId = req.body.productId;
   
//     Product.findById(prodId)
//     .then((product) =>{
//         product.name = updatedName;
//         product.imageUrl = updatedImageUrl;
//         product.description = updatedDescription;
//         product.price = updatedPrice;
//         return product.save();
//     })
//     .then(result =>{
//         // console.log("product is updated");
//         res.redirect("/");
//     })
//     .catch(err =>{
//         console.log(err);
//     })

// }

exports.updateHotel = async (req, res, next) => {
    try {
        const {hotelName,location,description , imageUrl, utilities} = req.body;
        
        const hotel = await Hotel.findById(req.params.id);

        if(hotel) {
            hotel.hotelName = hotelName
            hotel.location = location
            hotel.description = description
            hotel.imageUrl = imageUrl,
            hotel.utilities = utilities

            const updatedHotel = await hotel.save();

            res.json(updatedHotel);
        }
    } catch (err) {
        res.status(404)
        throw new Error('Hotel not found')
    }
};













// delete hotel 

exports.deleteHotelById = async (req, res, next) => { 

    // const hotelId = req.params.hotelId;
    // Hotel.findByIdAndRemove(hotelId)
    // .then(result =>{
    //     res.status(200).json({msg:"ho gaya delete"});
    // })
    // .catch(err =>{ 
    //     console.log(err);
    // })

    try {
        const hotel = await Hotel.findById(req.params.id);

        if(!hotel) {
            return res.status(401).json({msg:"hotel not found"});
        } 

        await hotel.remove();
        
        res.json({msg:"hotel deleted"})
    } catch (err) {
        console.error(err)
        return res.status(500).send('server error')
    }
    
}




exports.Booking = async (req, res, next) => {
   
    try {
        const user = await User.findById(req.user.id);
        
        if(!user) {
            return res.status(401).json({msg:"User not found"})
        }

        const hotel = await Hotel.findById(req.params.id);

        if(!hotel) {
            return res.status(401).json({msg:"Hotel not found"})
        }
        user.book.push(hotel._id);

        await user.save();

        res.status(200).json({msg:"Hotel successFully booked"})

    } catch (err) {
        console.log(err.message);

        res.status(500).send('server error')
    }
}

// to populate the booking 

exports.getBooking = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status().json({msg: "user not found"});
        }
        const booking =  await user.populate('book').execPopulate() 

        res.status(200).json({booking})

    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
    
}

// remove from booking 

exports.deleteBooking = async (req, res, next) =>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
           return res.status(401).json({msg:"user not found"});
        }
        const hotel = await Hotel.findById(req.params.id);

        if(!hotel){
            return res.status(401).json({msg:"hotel not found"});
        }
        
        
    //    user.book.pop(hotel);

       const aux = user.book.filter((hotel) => hotel._id !== hotel.id)
       user.book = aux;

       await user.save();

       res.status(200).json({msg:"booking removed"});

    }
    catch(err) {
        console.log(err);
    }

}