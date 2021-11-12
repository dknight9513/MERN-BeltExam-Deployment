const {Pirate} = require('../models/pirate')

module.exports.index = (req, res) => {
    Pirate.find().sort({name: 'asc'})
    .then(allPirates => res.json(allPirates))
    .catch(err => res.json({message: "Something went wrong.", error: err}))
}

module.exports.show = (req, res) => {
    Pirate.find({_id: req.params.id})
    .then(pirate => res.json(pirate))
    .catch(err => res.json({message: "Something went wrong.", error: err}))
}

module.exports.create = (req, res) => {
    // let newPirate = Pirate.new
    Pirate.create(req.body)
    .then(newPirate => res.json(newPirate))
    .catch((err) => res.json({error: err}))
}

module.exports.update = (req, res) =>{
    // let newPirate = Pirate.new
    Pirate.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators: true})
    .then(newPirate => res.json(newPirate))
    .catch((err) => res.json({error: err}))
}

module.exports.delete = (req, res) => {
    Pirate.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch((err) => console.log('error in Pirates.js update',err))
}