const router = require('express').Router();
const Bay = require('../../Models/bay.model');
const User = require('../../Models/user.model');
const Data = require('../../Models/data.model')
const bcrypt = require('bcryptjs');

router.route('/login').post( (req, res) => {
    try {
        User.findOne({email: String(req.body.email)})
        .then( user => {
            bcrypt.compare( String(req.body.password), user.hash)
            .then( () => {
                res.status(201).json({tracked_games: user.games});
            }).catch( () => res.status(500).json({error: "Server Error"}));
        })
        .catch( err => {
            res.status(500).json( {error : "Server could not verify bay"});
        })
    } catch (error) {
        res.status(500).json( {error : "Server Error"});
    }
});

router.route('/addbay').post( (req, res) => {
    try{
        User.findOne({'email':req.body.email})
        .then( user => {
            bcrypt.compare(String(req.body.password), user.hash)
            .then( () => {
                let curBaylength = user.bays.length
                let bayname =  `Bay${curBaylength + 1}`
                const newBay = new Bay({
                    name: bayname,
                    data: [],
                    company: user.company.name,
                    companyid: user.id
                }).save( (err, bay) => {
                    if(err) {
                        res.status(500).json({error:"Server Could not add Bay"});
                    }
                    Bay.findOne({"name": bayname}, (err, bay) =>{
                        if(err) res.status(500).json({error:"Server could not add bay to User account"});
                        user.bays.push(bay.id);
                        user.save( (err, response) => {
                            if(err) res.status(500).json({error: err})
                            res.status(201).json({msg: "Bay added to user!", bayid:bay.id, tracked_games: user.games, userid: user.id})
                        });
                    }); // bay findOne
                }); // newuser save
            }) // bcrypt then
            .catch( () => {
                res.status(500).json({error: "Server Error"}) 
            }); //bcrypt catch
        })
        .catch( () => { // User FindOne Catch
            res.status(500).json({error : "Server could not verify bay"});
        });
    } catch (error) { // Route catch
        res.status(500).json({error : "Server Error"});
    }
});

router.route('/adddata').post( (req, res) => {
    try {
        // UP SECURITY
        const newData = new Data({
            game: String(req.body.game),
            playSession: req.body.playSession,
            bayid: String(req.body.bayid),
            date: String(req.body.date),
            time: String(req.body.time)
        })
        .save()
        .then( data => {
            Bay.findOne({'_id':String(req.body.bayid)})
            .then( bay => {
                bay.data.push(data._id);
                bay.save((err, response) => {
                    if(err) {
                        res.status(500).json({error: err})
                    } else {
                        res.status(201).json({msg: "Data added!", bay: bay.data});
                    }
                })
            })
            .catch( err => {
                res.status(500).json({error: "Server did not find bay"})
            });
        })
        .catch( err => res.status(500).json({error:"Server could not create Data"})) // newData Save
    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }
});

router.route('/getdata/:id').get( (req, res) => {
    try {
        Data.find({'bayid':req.params.id})       
        .then( data => {
            res.json({data: data});
        })
        .catch( err => {
            res.status(500).json({error: "Server could not find bay"})
        });
    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }
});

router.route('/gettrackedgames/:id').get( (req, res) => {
    try {
        User.findById(req.params.id)
        .then( user => {
            res.status(201).json({tracked_games: user.games})
        })
        .catch();
    } catch (err) {
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;