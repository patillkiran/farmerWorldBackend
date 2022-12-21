
const Farmer = require('./../models/farmerModel');

exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        
        return res.status(200).json({
            status: 'success',
            data: farmers
        })
    } catch (err) {
        return res.status(400).json({
            status:'fail',
            message: err
        })
    }
}
exports.createFarmer = async (req, res) => {
    try {
        const newFarmer = await Farmer.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                farmer: newFarmer
            }
        })
    } catch (err) {
        return res.status(400).json({
            status:'fail',
            message: err
        })
    }
}
exports.getFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.farmerid);
        return res.status(200).json({
            status: 'success',
            data: farmer
        })
    } catch (err) {
        return res.status(400).json({
            status:'fail',
            message: err
        })
    }
}
exports.updateFarmer = async (req, res) => {
    try {
        req.body.updatedDate = new Date();  
        const farmer = await Farmer.findByIdAndUpdate(req.params.farmerid, req.body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            status: 'success',
            data: farmer
        })
    } catch (err) {
        return res.status(400).json({
            status:'fail',
            message: err
        })
    }
}

exports.deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.farmerid);
        return res.status(200).json({
            status: 'success',
            data: "done"
        })
    } catch (err) {
        return res.status(400).json({
            status:'fail',
            message: err
        })
    }
}