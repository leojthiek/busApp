
import BusModel from "../Schema/Bus.js";
import User from "../Schema/User.js";
import Booking from "../Schema/Booking.js";


function isvalidPhoneNumber(phoneNumber){
    const phoneNumberValidate = /^[0-9]{10}$/;
    return phoneNumberValidate.test(phoneNumber)
}

const userRegister = async(req,res)=>{
    try {
        const {name,age,sex,phoneNumber,password} = req.body

        const alredyExistUser = await User.findOne({phoneNumber:phoneNumber})

        if(alredyExistUser){
            return res.status(400).json({errors:"user already register"})
        }

        if(!isvalidPhoneNumber(phoneNumber)){
            return res.status(400).json({errors:"Invalid phone number format"})
        }

        const newUser = new User({
            name,
            age,
            sex,
            phoneNumber,
            password
        })

        const userSave = await newUser.save()

        if(userSave){
            res.status(200).json({userSave:userSave})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({errors:"error while registering user"})
    }
}


const userLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const userExist = await User.findOne({ phoneNumber });

    if (!userExist) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    if (userExist.password === password) {
      res.json({
        _id: userExist._id,
        name: userExist.name,
        phoneNumber: userExist.phoneNumber,
        age: userExist.age
      });
    } else {
      res.status(400).json({ errors: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};



  const userTicket = async(req,res)=>{
    try {
        const userId = req.params.id

        const ticket = await Booking.find({user:userId})
         if(!ticket){
            return res.status(400).json({errors:'you have not book any bus yet'})
         }

         res.status(200).json({ticket:ticket})
    } catch (error) {
        console.log(error)
        res.status(400).json({errors:'error while fetching userTicket'})
    }
  }

export {userRegister,userLogin,userTicket}