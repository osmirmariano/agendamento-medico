const { schedulings, controlers, clinics } = require("../../models/index");
var moment = require('moment');
var jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

class Scheduling { 
    constructor() {}

    async store(req, res) {
        let dataAtual = moment(req.body.date).format("DD-MM-YYYY");

        try {
            //find for verify if exists account of clinic
            let clinicFind = await clinics.find();
            clinicFind = clinicFind[0];
            if(clinicFind) {
                let dateCurrent = moment.weekdays(req.body.weekday).toLowerCase();
                let horarys =  Object.keys(clinicFind.horary).map((key) => [key, clinicFind.horary[key]]);

                let index = horarys.find(x => x[0] == dateCurrent);

                if(index) {
                    //verify if clinic answer today
                    if(index[1].operation == false)
                        return res.status(301).json({
                            messageCode: 3,
                            message: {
                                title: "Erro",
                                message: "Dia não disponível para agendamento."
                            }
                        })

                    //Verify hours equals start and end
                    if(req.body.start == req.body.end)
                        return res.status(301).json({
                            messageCode: 3,
                            message: {
                                title: "Erro",
                                message: "O horário final não pode ser igual ao inicial."
                            }
                        })

                    //Verify horary of clinic available
                    if(req.body.start < (index[1].horary.morning_start) || 
                        (req.body.start >= (index[1].horary.morning_end) &&
                        req.body.start < (index[1].horary.afternoon_start)) || 
                        req.body.start > (index[1].horary.afternoon_end) || req.body.end > (index[1].horary.afternoon_end)) {
                        res.status(400).json({
                            messageCode: 3,
                            message: {
                                title: "Erro",
                                message: "Esse horário não estar disponível."
                            }
                        })
                    } else {
                        let controler = await controlers.findOne({ day: dataAtual, weekday: req.body.weekday }).exec();
                        if(!controler) {
                            let controlerScheduling = {
                                day: dataAtual,
                                "clinic_id": new objectId(String(clinicFind._id)),
                                weekday: req.body.weekday
                            }
                            let controlerCreate = await controlers.create(controlerScheduling);
                            if(controlerCreate) {
                                let updateController = {
                                    $push: { 
                                        horary: {
                                            start: req.body.start,
                                            end: req.body.end
                                        }  
                                    }
                                }
                                let controlerUpdate = await controlers.findOneAndUpdate({ _id: controlerCreate._id }, updateController, { new: true}).exec();
                                let createScheduling = {
                                    ...req.body,
                                    'status': 'scheduled',
                                    'clinic_id': new objectId(String(clinicFind._id)),
                                    'controler_id': new objectId(controlerUpdate._id),
                                    'user_id': jwt.decode(req.headers.authorization).id,
                                    'horary.date': dataAtual,
                                    'horary.weekday': dateCurrent,
                                    'horary.start': req.body.start,
                                    'horary.end': req.body.end,
                                }
                                let schedulingCreate = await schedulings.create(createScheduling);
                                if(schedulingCreate) {
                                    res.status(200).json({
                                        messageCode: 0,
                                        message: {
                                            title: "Sucesso",
                                            message: "Exame agendado com sucesso."
                                        },
                                        data: {
                                            scheduling: schedulingCreate, 
                                            controler: controlerUpdate
                                        }
                                    })
                                } else {
                                    res.status(400).json({
                                        messageCode: 3,
                                        message: {
                                            title: "Erro",
                                            message: "Horário de exame não disponível."
                                        }
                                    })
                                }
                            }
                        } else {
                            let controler = await controlers.findOne({ day: dataAtual, 'clinic_id': new objectId(String(clinicFind._id)) }).exec();
                            
                            let cont = 0;
                            controler.horary.map(x => {
                                if(x.start == req.body.start || x.end == req.body.end) {
                                    return res.status(301).json({
                                        messageCode: 3,
                                        message: {
                                            title: "Erro",
                                            message: "Já existe uma consulta marcada para esse horário."
                                        }
                                    })
                                } else {
                                    cont++;
                                }
                            })
                            if(cont == controler.horary.length) {
                                let updateController = {
                                    $push: { 
                                        horary: {
                                            start: req.body.start,
                                            end: req.body.end
                                        }  
                                    }
                                }
                                let controlerUpdate = await controlers.findOneAndUpdate({ _id: controler._id }, updateController, { new: true}).exec();
                                let createScheduling = {
                                    ...req.body,
                                    'status': 'scheduled',
                                    'clinic_id': new objectId(String(clinicFind._id)),
                                    'controler_id': new objectId(controlerUpdate._id),
                                    'user_id': jwt.decode(req.headers.authorization).id,
                                    'horary.date': dataAtual,
                                    'horary.weekday': dateCurrent,
                                    'horary.start': req.body.start,
                                    'horary.end': req.body.end,
                                }
                                let schedulingCreate = await schedulings.create(createScheduling);
                                res.status(200).json({
                                    messageCode: 0,
                                    message: {
                                        title: "Sucesso",
                                        message: "Paciente agendado com sucesso."
                                    },
                                    data: {
                                        scheduling: schedulingCreate, 
                                        controler: controlerUpdate
                                    }
                                })
                            }
                        }
                    }
                }
            } else {
                res.status(400).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Erro inesperado."
                    },
                })
            }
        } catch (error) {
            res.status(401).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível realizar o agendamento."
                },
                error: error
            })
        }
    }

    async markOff(req, res) {
        try {
            let findControler = await controlers.update({
                day: moment(req.body.date).format("DD-MM-YYYY"),
                weekday: req.body.weekday
            }, {
                $pull: {
                    'horary': {
                        $and: [
                            {
                                'start': {
                                    $eq: req.body.start
                                },
                            }, {
                                'end': {
                                    $eq: req.body.end
                                }
                            }
                        ]
                    }
                }
            }).exec();
            
            if(findControler.nModified != 0) {
                let findScheduling = await schedulings.findOneAndUpdate({ _id: req.params.id }, { status: 'unscheduled' }, { new: true }).exec();
                if(findScheduling) {
                    res.status(200).json({
                        messageCode: 0,
                        message: {
                            title: "Sucesso",
                            message: "Consulta desmarcada com sucesso!"
                        },
                        data: findScheduling
                    })
                } else {
                    res.status(400).json({
                        messageCode: 3,
                        message: {
                            title: "Erro",
                            message: "Não foi possível cancelar agendamento da consulta."
                        }
                    })
                }
            } else {
                res.status(400).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Não foi possível encontrar nenhuma consultas agendadas para essa data e horário."
                    },
                })
            }
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível desmarcar a consultas agendadas."
                },
            })
        }
    }
} 

module.exports = new Scheduling();
