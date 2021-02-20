//database configuration module location
const mongoose = require('../../../config/database');
//define the schema of location
const locationSchema = mongoose.Schema({
    number: { 
        type: String,
        default: null
    },
    cep: { 
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    complement: { 
        type: String,
        default: null
    },
    neighborhood: { 
        type: String, 
        default: null
    },
    city: {
        type: String,
        default: null
    },
    uf: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});
//define the database location model with all fields
const location = mongoose.model('location', locationSchema);
//exports the module, in which case it must be required if you want to manipulate this collection
module.exports = location;
        