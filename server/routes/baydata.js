const router = require('express').Router();
const Data = require('../../Models/data.model');

router.route('/').get( (req, res) => {
    Data.find()
        .then( data => res.json(data))
        .catch( err => res.status(404).json("Error: " + err));
});


router.route('/add').post( (req, res) => {
    
});

module.exports = router;