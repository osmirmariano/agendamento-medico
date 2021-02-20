"use strict";
const { users, locations } = require('../../models/index');
var bcrypt = require('bcryptjs');
var moment = require('moment');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

class User { 
    constructor() {}

    async store(req, res){
        let hash = bcrypt.hashSync(req.body.password, 8);
        let userBody = {
            ...req.body,
            "password.password": hash,
        }

        try {
            let createLocation = await locations.create(userBody.location);
            userBody.location_id = new objectId(String(createLocation._id));
            let userCreate = await users.create(userBody);

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
                updated: moment().format("YYYY-MM-DD"),
            }
            body.location.updated = moment().format("YYYY-MM-DD");
            let userUpdate = await users.findByIdAndUpdate({ _id: req.params.id }, body, { new: true });
            await locations.findByIdAndUpdate({ _id: new objectId(String(createLocation._id))}, body.location);
            
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
