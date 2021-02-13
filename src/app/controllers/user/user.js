"use strict";
const { users } = require('../../models/index');
var bcrypt = require('bcryptjs');
var moment = require('moment');

class User { 
    constructor() {}

    async store(req, res){
        let hash = bcrypt.hashSync(req.body.password, 8);
        let userBody = {
            ...req.body,
            "password.password": hash,
        }

        try {
            let userCreate = await users.create(userBody)
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário registrado com sucesso!"
                },
                data: userCreate
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível criar usuário"
                },
                erro: error
            })
        }
    }

    async update(req, res){
        try {
            let body = {
                ...req.body,
                updated: moment().format("YYYY-MM-DD")
            }
            let userUpdate = await users.findByIdAndUpdate({ _id: req.params.id }, body, { new: true });
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário atualizado com sucesso!"
                },
                data: userUpdate
            });
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível editar usuário"
                },
                error: error
            })
        }
    }

    async showById(req, res){
        try {
            let userInfo = await users.findOne({ _id: req.params.id }, '-password').exec();
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário listado com sucesso!"
                },
                data: userInfo
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Erro no banco de dados"
                },
                erro: error
            })
        }
    }
} 

module.exports = new User();
