const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {
  
});

router.get("/list", async (request, response) => {
    const list = await User.find({}, '_id first_name last_name');

    response.status(200).json({
        message: "ok",
        data: list
    });
});

router.get("/:id", async (request, response) => {
    const id = request.params.id
    const user = await User.findOne({_id: id})

    if(user){
        response.status(200).json({
            message: "ok",
            data: user
        })
    }
    else {
        response.status(400).json({
            message: "failed",
            error: "invalid id"
        })
    }
});

module.exports = router;