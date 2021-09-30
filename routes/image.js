const router = require('express').Router();
const Image = require('../models/image.model');
const verify = require('./verifyToken');

router.post(`/`, async (req, res) => {
    const image = new Image({
         id : req.body.id,
         title : req.body.title,
         description : req.body.description,
         price : req.body.price,
         imageFile : req.body.imageFile
    });
    try {
        const savedImage = await image.save();
        res.send({userId: savedImage._id});
    }
    catch(err) {
        res.status(400).send(err);
    }
    res.send(req.Image);
});

module.exports = router;