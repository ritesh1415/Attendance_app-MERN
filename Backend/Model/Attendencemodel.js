import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    signIn: {
        // date: { type: Date, default: null },
        time: { type: String, default: null },
    },
    signOut: {
        // date: { type: Date, default: null },
        time: { type: String, default: null },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const Attendencemodel= mongoose.model('Attendence', attendanceSchema);
export default Attendencemodel;
