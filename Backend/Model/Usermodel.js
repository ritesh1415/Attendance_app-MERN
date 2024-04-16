import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // role: {
    //     type: String,
    //     required: [true, "Role is required"],
    //     enum: ['admin', 'user']
    // },
    // admin: {
    //     type: String,
    //     validate: {
    //         validator: function () {
    //             return this.role === 'admin';
    //         },
    //         message: 'Admin field is required for admin users'
    //     }
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hasattend: {
        type: Boolean,
        default: false, 
    },
   
// required:[true,"Attendence id is required"],
    

}, { timestamps: true });

const UserModel= mongoose.model('User', userSchema);
export default UserModel;
