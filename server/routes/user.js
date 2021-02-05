const router = require('express').Router();
const User = require('../../Models/user.model'); // Need User Schema 

router.route('/login').post( (req, res) => {
    try {
        User.findOne({'email': req.body.email}, (err, user) => {
            if(user === null) {
                const user = new User({
                    name: String(req.body.name),
                    email: String(req.body.email),
                    token: String(req.body.token),
                    company: ""
                }) 
                .save()
                .then(user => { 
                    return res.json({msg: "Account added and Logged in!", user:user, status:200});
                })
                .catch(err => {
                    return res.status(500).json( {error: "Could not save User -- MongoDB save() error", err:err});
                })
            } else {
                return res.json({msg: "Logged In!", user:user, status: 200});
            }
        });
    } catch {
        res.status(500).json( {error: "Tracker Server error -- Login Error from Server"} );
    }
}); 

router.route('/updateinfo').post( (req, res) => {
    try {
        User.findOne({'email': req.body.email})
        .then( user => {
            user.name = req.body.name
            user.games = req.body.games
            user.save()
            .then( () => res.status(201).json({msg: 'Information Updated!'}))
            .catch( () => res.status(500).json({error: "Server could not save new password. Try again later"}));
        })
        .catch(err => res.status(500).json({error: "User email not found"}));
    } catch (error) {
        res.status(500).json({error: "Update password from Server failed"})
    }
});

module.exports = router; 