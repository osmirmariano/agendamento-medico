const { users } = require('../../models/index')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../../config/config');

class Login {
    /**
     * Method for login
     * @param {*} req 
     * @param {*} res 
     */
    async login(req, res) {
        try {
            var userFinded = await users.findOne({ user: req.body.user }).exec();
            var passwordIsValid = bcrypt.compareSync(req.body.password, userFinded.password.password);
            console.log(passwordIsValid)
            if (!passwordIsValid) {
                var auth = {
                    auth: false, 
                    type: null,
                    token: null
                }
                
                return res.status(400).json({
                    messageCode: 3,
                    message: {
                        title: "Erro",
                        message: "Usuário e/ou senha não encontrado"
                    },
                    auth: auth
                })
            }
            
            var token = jwt.sign({ id: userFinded._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
    
            var auth = {
                auth: true, 
                type: "Bearer",
                token: token
            }
            
            return res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Login realizado com sucesso!"
                },
                data: {
                    ...auth,
                    user: userFinded.user,
                    _id: userFinded._id
                }
            })
        } catch (error) {
            return res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Usuário não encontrado"
                }
            })
        }
    }
}

module.exports = new Login();