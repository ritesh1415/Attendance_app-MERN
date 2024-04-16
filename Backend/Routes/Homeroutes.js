import express from 'express';
import { Signin, getUserAttendance, getallAttendence, handleSignOut } from '../Controller/Homecontroller.js';

const router = express.Router();

router.post('/sign-in', Signin);
router.get('/get-attandence/:userId', getUserAttendance);
router.post('/sign-out/:userId', handleSignOut);


router.get('/all-users', getallAttendence);

export default router;
