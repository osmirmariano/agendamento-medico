//modulo de configuração do database user
const mongoose = require('../../../config/database');

//define o schema do user
const usersSchema = mongoose.Schema({
    user: { 
        type: String, 
        lowercase: true, 
        maxlength: 40, 
        unique: true, 
        sparse: true, 
        required: [true, 'Usuário não informado.'] 
    },
    password: {
        password: { type: String, required: [true, 'Senha não informada.'] },
        requested_change: { type: Boolean, default: false },
        last_change: { type: Date, default: null },
    },
    name: { 
        type: String, 
        maxlength: 120, 
        required: [true, 'Nome não informado.'] 
    },
    email: {
        email: {
            type: String, 
            lowercase: true, 
            maxlength: 200, 
            required: [true, 'Email não informado.'], 
            unique: true, 
            sparse: true
        },
        email_change: {
            type: String, 
            lowercase: true, 
            maxlength: 200,
            default: false
        },
        email_confirm: { 
            type: Boolean,
            default: false
        }
    },
    permissions: [{
        type: String
    }],
    location: {
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
        }
    },
    birth_date: {
        type: Date,
    },
    cpf: {
        type: String, 
        maxlength: 11,
    },
    blocked: {
        type: Boolean,
        default: false
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
})

//define o model do database user com todos os campos
const users = mongoose.model('users', usersSchema)

//exporta o modulo, nesse caso ele deve ser requerido caso queira manipular essa colection
module.exports = users