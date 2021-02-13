//database configuration module controler
const mongoose = require('../../../config/database');
//define the schema of controler
const controlerSchema = mongoose.Schema({
    day: {
        type: String
    },
    horary:[{
        start: {
            type: String
        },
        end: {
            type: String
        }
    }],
    weekday: { 
        type: String 
    },
    clinic_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'clinic', 
        default: null 
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null }
});
//define the database controler model with all fields
const controler = mongoose.model('controler', controlerSchema);
//exports the module, in which case it must be required if you want to manipulate this collection
module.exports = controler;