import UserModel from "../Model/Usermodel.js";
import Attendencemodel from "../Model/Attendencemodel.js";

const Signin = async (req, res) => {
    try {
      
        const userId = req.body.user;

        const existingUser = await UserModel.findById(userId);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const todayDate = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendencemodel.findOne({
            user: userId,
            date: todayDate,
        });

        if (existingAttendance) {
            return res.status(200).send({
                success: false,
                message: "User has already attended today",
            });
        }

        const formattedTime = new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });

        const attendanceRecord = new Attendencemodel({
            user: userId,
            date: todayDate,
            signIn: {
                date: todayDate,
                time: formattedTime,
            },
            signOut: null, 

        });

        await attendanceRecord.save();

        existingUser.hasattend = true;
        await existingUser.save();

        return res.status(200).send({
            success: true,
            message: "User signed in successfully for today",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Signin API",
            error: error.message,
        });
    }
};

//get user attendence
const getUserAttendance = async (req, res) => {
    try {
        const userId = req.params.userId;

        const existingUser = await UserModel.findById(userId);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const userAttendance = await Attendencemodel.find({ user: userId });

        return res.status(200).send({
            success: true,
            userAttendance: userAttendance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in getUserAttendance API",
            error: error.message,
        });
    }
};

//sign-out
const handleSignOut = async (req, res) => {
  try {
    const userId = req.body.user;

    // Find the user's attendance record for today
    const todayDate = new Date().toLocaleDateString();
    const attendanceRecord = await Attendencemodel.findOne({
      user: userId,
      // date: todayDate,
    });

    if (!attendanceRecord) {
      return res.status(404).send({
        success: false,
        message: 'Attendance record not found',
      });
    }

    // Define the formattedTime here
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    // Update the signOut field
    attendanceRecord.signOut = {
    //   date: todayDate,
      time: formattedTime,
    };

    await attendanceRecord.save();

    return res.status(200).send({
      success: true,
      message: 'User signed out successfully for today',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in Signout API',
      error: error.message,
    });
  }
};
  
//get all attendence users

const getallAttendence=async(req,res)=>{
  try {
      const attendance=await Attendencemodel.find({}).populate('user')
      if(!attendance){
          return res.status(404).send({
              success:false,
              message:'no attendence found'
          })
      }
      return res.status(201).send({
          success:true,
          attendancecount:attendance.length,
          message:"all attendence users list",
          attendance
      })
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      success:false,
      message:error.message
    })  
  }
}

// const Deleteattendence=async(req,res)=>{
//   try {
// const attendance=await Attendencemodel.findByIdAndDelete(req.params.id)
// if(!attendance){
//   console.log("attendence",req.attendance)
//   return res.status(404).send({
//     success:false,
//     message:"no attendence",
//   })
// }    console.log("attendence",req.attendance)

// const userId = attendance.user;
// return res.status(201).send({
//   success:true,
//   message:"deleted",
//   attendance
// })
//   } catch (error) {
//     console.error(error);
//     return res.status(404).send({
//       success:false,
//       message:"errror in delete",
//       error: error.message,

//     })
//   }
// }

export { Signin,getUserAttendance,handleSignOut,getallAttendence}
