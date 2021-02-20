const { users } = require('../models/index');
var jwt = require('jsonwebtoken');

class Permission { 
    constructor() {}

    /**
     * Check permission of manager
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkPermission(req, res, next) {
        try {
            let userFind = await users.findOne({_id: jwt.decode(req.headers.authorization).id});
            let permission = userFind.permissions.find(x => x === 'user.admin' || x === 'master');
            if(permission)
                next()
            else 
                res.status(401).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Você não permissão para executar essa ação"
                    }
                });
        } catch (error) {
            res.status(401).send({ 
                messageCode: 5,
                message: {
                    title: "Erro",
                    message: "Erro no banco de dados"
                }
            })
        }
    }

    /**
     * Check permission for developer and design
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkDeveloperDesign(req, res, next) {
        try {
            let userFind = await users.findOne({_id: jwt.decode(token).id});
            let permission = userFind.permissions.find(x => x === 'user.developer' || x === 'user.design');
            if(permission)
                next()
            else 
                res.status(401).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Você não permissão para executar essa ação"
                    }
                });
        } catch (error) {
            res.status(401).send({ 
                messageCode: 5,
                message: {
                    title: "Erro",
                    message: "Erro no banco de dados"
                }
            })
        }
    }

    /**
     * Check permission all users, manager, developer and design
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkAllUsers(req, res, next) {
        try {
            let userFind = await users.findOne({_id: jwt.decode(req.headers.authorization).id});
            let permission = userFind.permissions.find(x => x === 'user.developer' || x === 'user.design' || x === 'user.manager');
            if(permission)
                next()
            else 
                res.status(401).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Você não permissão para executar essa ação"
                    }
                });
        } catch (error) {
            res.status(401).send({ 
                messageCode: 5,
                message: {
                    title: "Erro",
                    message: "Erro no banco de dados"
                }
            })
        }
    }
} 

module.exports = new Permission();
