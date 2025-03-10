import express from 'express';
import { deleteUser, getAllusers } from '../controllers/admin.controller.js';
import VerifyAdmin from '../middlewares/VerifyAdmin.js';


const router = express.Router();

router.get("/getAllUsers",VerifyAdmin, getAllusers);
router.get("/deleteUser/:id",VerifyAdmin, deleteUser);



export default router; 