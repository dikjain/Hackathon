import Gig from "../models/gig.model.js"
export const createGig = async (req, res) => {
    const newGig = new Gig({
        userId: req.body.userId,
        title: req.body.serviceTitle,
        desc: req.body.description,
        totalStars: 0,
        starNumber: 0,
        cat: req.body.category,
        price: Number(req.body.price),
        cover: req.body.coverImage,
        images: req.body.uploadImages,
        shortTitle: req.body.serviceTitle,
        shortDesc: req.body.shortDescription,
        deliveryTime: Number(req.body.deliveryTime),
        features: req.body.features,
        sales: 0,
        });

    try {
        const savedGig = await Gig.create(newGig);
        res.status(201).json(savedGig);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteGig =async(req,res,next)=>{
    try{
       const gig=await Gig.findById(req.params.id)

       if(gig.userId!==req.userId)
        return res.status(403).send("You can only delete your own gig")

       await Gig.findByIdAndDelete(req.params.id)
       res.status(200).send("gig has been deleted")
    }catch(err){
        res.status(err.status).send(err.message)
    }
}

// export const getGig=async(req,res,next)=>{
//     try{
//         const gig=await Gig.findById(req.params.id)
//         if(!gig) 
//             res.status(404).send("Gig not found")

//         res.status(200).send(gig)
//     }catch(err){
//         res.status(err.status).send(err.message)
//     }
// }

export const getGigs = async (req, res) => {
    const q = req.query;

    const filters = {};

    if (q.category) filters.cat = q.category;
    if (q.minPrice) filters.price = { $gte: Number(q.minPrice) };
    if (q.maxPrice) filters.price = { ...filters.price, $lte: Number(q.maxPrice) };
    if (q.search) filters.title = { $regex: q.search, $options: "i" };

    try {
        const gigs = Object.keys(filters).length > 0 
            ? await Gig.find(filters) 
            : await Gig.find().sort({ updatedAt: -1 });
        res.status(200).json(gigs);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export const getUserGigs = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const gigs = await Gig.find({ userId: userId });

        if (gigs.length === 0) {
            return res.status(404).send("No gigs found for this user");
        }

        res.status(200).json(gigs);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

