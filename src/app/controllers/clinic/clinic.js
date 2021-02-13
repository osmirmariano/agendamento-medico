const { clinics } = require('../../models/index');
var moment = require('moment');

class Clinic {
    /**
     * Create user Clinic
     * @param {*} req 
     * @param {*} res 
     */
    async store (req, res) {
        let userFineld = {
            ...req.body
        }
        try {
            let createClinic = await clinics.create(userFineld);
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Clinica cadastrada com sucesso"
                },
                data: createClinic
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível criar a clínica"
                },
                error: error
            })
        }
    }
}

module.exports = new Clinic();