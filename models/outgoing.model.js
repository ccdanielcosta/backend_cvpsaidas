const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

//Define a schema
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const OutgoingSchema = new Schema({
        lat: {
            type: String,
            trim: true,  
            required: true
        },
        lng: {
            type: String,
            trim: true,  
            required: true,  
        },
        street: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        situation: {
            type: String,
            trim: true,
            required: true
        },
        vehicle: {
            type: String,
            trim: true,
            required: true
        },
        driver: {
            type: String,
            trim: true,
            required: true
        },
        date: {
            type: Date,
            trim: true,
            required: true
        },
        output_type: {
            type: String,
            trim: true,
            required: true
        },
        obs: {
            type: String,
            trim: true,
            required: true
        } 
                   
});
module.exports = mongoose.model('outgoing', OutgoingSchema)