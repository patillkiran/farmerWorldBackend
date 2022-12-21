const mongoose = require('mongoose');
const farmerSchema = new mongoose.Schema({
    name: {
        type:String,
        required : [true, "A farmer must have a name"],
        trim: true
    },
    age: {
        type : Number,
        required: [true, "A farmer must have age"]
    },
    gender: String,
    married : String,
    familyCount: Number,
    numberOfChildren: Number,
    totalFieldArea: {
        type:Number,
        required : [true, "A farmer must have a field"]
    },
    crop: {
        type:String,
        required : [true, "A field must have a crop"]
    },
    photo: String,
    educationLevel:String,
    createdDate: {
        type: Date,
        default: new Date()
    },
    updatedDate: Date
})

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;