const { schedulings } = require("../../models/index");
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

class Admin { 
    constructor() {}

    async showSchedulingClinic(req, res) {
        let page = 1
        let results = 100
        let queryGeneric = {}

        if (req.query.page)
            page = parseInt(req.query.page)
        if (req.query.results)
            results = parseInt(req.query.results)
            
        try {
            let clinicFind = await clinics.find();
            clinicFind = clinicFind[0];

            schedulings.countDocuments(queryGeneric, (err, count) => {
                schedulings.aggregate([
                    {
                        $match: {
                            'clinic_id': new objectId(String(clinicFind._id)),
                            'horary.date': {
                                $gte: moment(req.body.date_start).format("DD-MM-YYYY"), 
                                $lt: moment(req.body.date_end).format("DD-MM-YYYY")
                            },
                            'status': req.query.status
                        }, 
                    }, {
                        $sort: {
                            _id: -1
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            let: { 
                                id: "$user_id"
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$_id', '$$id'] }
                                            ]
                                        }
                                    }
                                }
                            ],
                            as: "user"
                        },
                    }, {
                        $unwind: {
                            path: "$user"
                        }
                    }, 
                ])
                .limit(results)
                .skip((page * results) - results)
                .exec()
            })

            

            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Consultas agendadas listadas com sucesso."
                },
                data: schedulingClinic
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível encontrar consultas agendadas."
                },
            })
        }
    }
} 

module.exports = new Admin();
