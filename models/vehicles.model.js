const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

//Define a schema
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const TruckSchema = new Schema({
        license_plate: {
            type: String,
            trim: true,  
            required: true,
            unique: true
        },
        year: {
            type: Date,
            trim: true,  
            required: true,  
        },
        truck_type: {
            type: String,
            trim: true,  
            required: true,  
        },
        company: {
            type: String,
            trim: true,
            required: true
        },
        brand: {
            type: String,
            trim: true,
            required: true
        },
        model: {
            type: String,
            trim: true,
            required: true
        },
        weight: {
            type: Float,
            trim: true,
            required: true
        },
        width: {
            type: Float,
            trim: true,
            required: true
        },
        height: {
            type: Float,
            trim: true,
            required: true
        },
        lenght: {
            type: Float,
            trim: true,
            required: true
        }
});
module.exports = mongoose.model('trucks', TruckSchema)