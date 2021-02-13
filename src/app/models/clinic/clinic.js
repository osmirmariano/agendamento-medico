//database configuration module clinic
const mongoose = require('../../../config/database');
//define the schema of clinic
const clinicSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Nome da clínica é obrigatório'] 
    },
    description: { 
        type: String, 
        required: [true, 'Descrição é necessário'] 
    },
    email: {
        type: String, 
        lowercase: true, 
        maxlength: 200, 
        sparse: true
    },
    phone: [{
        type: String, 
        maxlength: 30, 
        lowercase: true, 
        sparse: true,
    }],
    horary: {
        monday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        tuesday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        wednesday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        thursday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        friday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        saturday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        },
        sunday: {
            operation: {
                type: Boolean,
                default: null
            },
            horary: {
                morning_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                morning_end: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_start: {
                    type: String,
                    timestamps: true,
                    default: null
                },
                afternoon_end: {
                    type: String,
                    timestamps: true,
                    default: null
                }
            }
        }
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null }
});
//define the database clinic model with all fields
const clinic = mongoose.model('clinic', clinicSchema);
//exports the module, in which case it must be required if you want to manipulate this collection
module.exports = clinic;
        