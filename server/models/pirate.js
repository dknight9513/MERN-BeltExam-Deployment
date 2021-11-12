const mongoose = require('mongoose')

const PirateSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name is a required field."]
    },
    image:{
        type:String,
        required: [true, "You must provide a URL for an image."]
    },
    numChests:{
        type:Number,
        required: [true, "You must provide a number of treasure chests."]
    },
    catchPhrase:{
        type:String,
        required: [true, "Each pirate must have their own catchphrase!"]
    },
    position:{
        type:String,
        required: [true, "Every pirate has a position in the crew. You need to assign them one."]
    },
    pegLeg:{
        type:Boolean,
        required: [true, "Surely you know if this pirate has a peg leg or not."]
    },
    eyePatch:{
        type:Boolean,
        required: [true, "Surely you know if this pirate has an eye patch or not."]
    },
    hookHand:{
        type:Boolean,
        required: [true, "Surely you know if this pirate has a hook hand or not."]
    }
})

module.exports.Pirate = mongoose.model("Pirate", PirateSchema)