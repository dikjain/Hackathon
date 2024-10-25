import {createGig, getGigs} from "../controllers/gig.controller.js";
import express from 'express';


const router = express.Router();

router.post("/post",createGig)
router.get("/",getGigs)





export default router
