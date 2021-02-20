//database configuration module sheduling
const mongoose = require('../../../config/database');

//define the schema of sheduling
const schedulingSchema = mongoose.Schema({
    name: { 
        type: String, 
        maxlength: 120, 
        required: [true, 'Nome não informado.'] 
    },
    email: {
        type: String, 
        lowercase: true, 
        maxlength: 200, 
        required: [true, 'Email não informado.'],
        sparse: true
    },
    phone: {
        type: String, 
        maxlength: 30, 
        lowercase: true, 
        sparse: true,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', 
        default: null
    },
    controler_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'controler', 
        default: null 
    },
    clinic_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'clinic', 
        default: null 
    },
    insurance: { 
        type: String, 
        maxlength: 120,
        default: null
    },
    type_exam: { 
        type: Number,
        enum: { 
            values: [1, 2] 
        },
        default: 1
    },
    horary: {
        date: {
            type: String
        },
        weekday: {
            type: String
        },
        start: {
            type: String
        },
        end: {
            type: String
        }
    },
    status: {
        type: String,
        enum: { 
            values: ['scheduled', 'unscheduled'] 
        }
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null }
});
//define the database sheduling model with all fields
const scheduling = mongoose.model('scheduling', schedulingSchema);
//exports the module, in which case it must be required if you want to manipulate this collection
module.exports = scheduling;
        