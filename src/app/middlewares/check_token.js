const { users } = require('../models/index')
var jwt = require('jsonwebtoken')
var config = require('../../config/config');

class CheckToken {
    constructor() { }

    /**
     * Method for check authorization with token
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async check(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                messageCode: 5,
                message: {
                    title: "Erro",
                    message: "Envio do token é obrigatório!"
                },
                auth: false
            })
        } else {
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        messageCode: 3,
                        message: {
                            title: "Erro",
                            message: "Falha na autenticação do token!"
                        },
                        auth: false
                    })
                } else {
                    try{
                        let usersFindId = await users.findById(decoded.id, 'user name email.email phone registered');
                        if(!usersFindId)  {
                            res.status(404).json({
                                messageCode: 3,
                                message: {
                                    title: "Erro",
                                    message: "O token informado não pertence a seu usuário!"
                                }
                            })
                        }  else {
                            req.headers = { ...req.headers, auth: usersFindId }
                            next();
                        }
                    } catch (error) {
                        res.status(401).json({
                            messageCode: 3,
                            message: {
                                title: "Erro",
                                message: "O token informado não pertence a seu usuário!"
                            }
                        })
                    }
                }
            });
        }
    }
}

module.exports = new CheckToken();