import {createGig, getGigs, getGig} from "../controllers/gig.controller.js";
import express from 'express';


const router = express.Router();

router.post("/post",createGig)
router.get("/",getGigs)
router.get("/:id",getGig)





export default router
