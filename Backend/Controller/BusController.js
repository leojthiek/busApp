import Booking from "../Schema/Booking.js"
import BusModel from "../Schema/Bus.js"

const createBusAvailability = async (req, res) => {
  try {
    const {
      busName,
      busNumber,
      departureCity,
      arriveCity,
      departureTime,
      totalSeat,
      availableSeat,
      busImage,
      price,
    } = req.body

    const busAlreadyCreated = await BusModel.findOne({busNumber:busNumber})
    if(busAlreadyCreated){
        return res.status(400).json({errors:'Bus No. is already available'})
    }

    const newBus = new BusModel({
        busName,
        busNumber,
        departureCity,
        arriveCity,
        departureTime,
        price,
        totalSeat,
        busImage,
        availableSeat,
    })

    const success = await newBus.save()
    if(success){
        res.status(200).json({success:success})
    } else {
        res.status(400).json({errors:"Error while saving the bus availability"});
      }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: "Internal server error" });
  
  }
}

// Controller for booking seats
const bookSeats = async (req, res) => {
    try {
      const { userId, busId, seatNumbers } = req.body;

      const existingSeat = await Booking.findOne({bus:busId, seatNumber:seatNumbers})

      if(existingSeat){
        return res.status(400).json({errors:"seat already booked, select other"})
      }
  
      const booking = new Booking({
        user: userId,
        bus: busId,
        seatNumber: seatNumbers,
      });
  
      // Save the booking to the database
     const success = await booking.save();

     if(success){
        const bus = await BusModel.findOne({_id:busId})
        
        if(!bus){
            return res.status(400).json({errors:"bus not found for this ticket"})
        }

      bus.availableSeat -= 1
        await bus.save()
     }
      res.status(201).json({ message: "Booking successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const findBusAvailable = async(req,res) => {
    try {
      const {arriveCity,departureCity,departureTime} = req.body
       
  

      if(arriveCity === departureCity){
        res.status(400).json({errors:'cannot set location to be the same state'})
      }

      const departureDate = new Date(departureTime);
      const nextDay = new Date(departureDate);
      nextDay.setDate(departureDate.getDate() + 1);
  
      // Query the database for buses matching the criteria
      const findingBuses = await BusModel.find({
        arriveCity,
        departureCity,
        departureTime: {
          $gte: departureDate,
          $lt: nextDay,
        },
      });

      if (findingBuses.length > 0) {
        return res.status(200).json({ findingBuses });
      } else {
        return res.status(404).json({ errors: 'No buses available for this route and date.' });
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({errors:'error while finding buses'})
    }
  }

  

  const busDetailsContoller = async (req, res) => {
    try {
      const id = req.params.id;
      const bus = await BusModel.findOne({ _id: id });
  
      if (!bus) {
        return res.status(404).json({ errors: 'Bus details not found' });
      }
  
      res.status(200).json({ bus: bus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Error while fetching bus details' });
    }
  };
  


export {createBusAvailability,bookSeats, findBusAvailable,busDetailsContoller}
