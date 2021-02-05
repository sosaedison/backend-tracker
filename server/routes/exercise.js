const router = require('express').Router();
const Excercise = require('../../Models/exercise.models');

router.route('/').get( (req, res) => {
    Excercise.find()
        .then( exercises => res.json(exercises) )
        .catch( err => res.status(400).json('Error: ' + err) );
});

router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Excercise({
        username, 
        description, 
        duration, 
        date
    });

    newExercise.save()
        .then( () => res.json('Exercise Added!') )
        .catch( err => res.status(404).json("Error: "+ err) );
});

router.route('/:id').get( (req, res) =>{
    Excercise.findById(req.params.id)
        .then( exercise => res.json(exercise) )
        .catch( err => res.status(400).json('Error: ' + err) );
} );

router.route('/:id').delete( (req, res) =>{
    Excercise.findByIdAndDelete(req.params.id)
        .then( () => res.json('Exercise Deleted') )
        .catch( err => res.status(400).json('Error: ' + err) );
} );

router.route('/update/:id').post( (req, res) => {
    Excercise.findById(req.params.id)
        .then( exercise => {
            exercise.userName = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date( req.body.date);
            
            exercise.save()
                .then( () => res.json('Exercise update') )
                .catch( err => res.status(400).json('Error: ' + err) );
        })
        .catch( err => res.status(400).json("Error: "+ err) );
});

module.exports = router;