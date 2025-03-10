import express from 'express';
import { deleteUser, getAllusers } from '../controllers/admin.controller.js';


const router = express.Router();

router.get("/getAllUsers", getAllusers);
router.get("/deleteUser/:id", deleteUser);



export default router;