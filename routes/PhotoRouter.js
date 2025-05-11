const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel")
const router = express.Router();

router.post("/", async (request, response) => {
  
});

router.get("/photosOfUser/:id", async (request, response) => {
    const userId = request.params.id
    const photos = await Photo.find({user_id: userId}, '_id user_id file_name date_time comments').lean()

    if(photos){
        for(const photo of photos){
            for(const comment of photo.comments){
                const user = await User.findOne({_id: comment.user_id})
                comment.user = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            }
            photo.comments = photo.comments.map(item => ({
                comment: item.comment,
                date_time: item.date_time,
                _id: item._id,
                user: item.user
            }))
        }        

        response.status(200).json({
            message: "ok",
            data: photos
        })
    }
    else {
        response.status(400).json({
            message: "failed",
            error: "Error when tried to find photos of user"
        })
    }
});

module.exports = router;
