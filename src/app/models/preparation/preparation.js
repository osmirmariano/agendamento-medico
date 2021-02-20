//database configuration module preparation
const mongoose = require('../../../config/database');
//define the schema of preparation
const preparationSchema = mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Título do exame obrigatário.'] 
    },
    description: {
        type: String,
        default: null,
        required: [true, 'Descrição do exame obrigatário.'] 
    },
    scheduling_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'scheduling', 
        default: null 
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});
//define the database preparation model with all fields
const preparation = mongoose.model('preparation', preparationSchema);
//exports the module, in which case it must be required if you want to manipulate this collection
module.exports = preparation;
        