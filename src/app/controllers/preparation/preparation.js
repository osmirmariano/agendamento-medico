const { preparations } = require("../../models/index");

class Preparation { 
    constructor() {}

    async store (req, res) {
        try {
            let body = {
                ...req.body,
                scheduling_id: req.query.scheduling_id
            }
            let createPre = await preparations.create(body);
            return res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Preparo criado com sucesso!"
                },
                data: createPre
            });
        } catch (error) {
            return res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível prepar o exame!"
                }
            });
        }
    }

    async update (req, res) {
        try {
            let createPre = await preparations.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            return res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Preparo atualizado com sucesso!"
                },
                data: createPre
            });
        } catch (error) {
            return res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível editar preparo!"
                }
            });
        }
    }

    async list (req, res) {
        try {
            let list = await preparations.findById({ _id: req.params.id });
            return res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Preparo listado com sucesso!"
                },
                data: list
            });
        } catch (error) {
            return res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível listar preparo!"
                }
            });
        }
    }
} 

module.exports = new Preparation();
