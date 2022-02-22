const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const dateNow = require('../utils/getDateNow');
const sendMail = require('../utils/sendMail');

module.exports = {
    async show(request, response){
        const contact_us = await connection('contact_us').select('*');
        return response.json(contact_us);
    },
    async create(request, response){

        const today = dateNow();

        const {
            email, 
            name, 
            subject,
            message,
            phone,
        }  = request.body;

        const html = `
            <h5>Email automático de contato</h5>
            <ul>
                <li><b>Nome:</b> ${name}</li>
                <li><b>Email:</b> ${email}</li>
                <li><b>Telefone:</b> ${phone}</li>
                <li><b>Assunto:</b> ${subject}</li>
                <li><b>Mensagem:</b> ${message}</li>
            </ul>
            `                           

        const mailOptions = {
            subject: `Tem uma mensagem pra você`,
            html
        };
        
        sendMail(mailOptions);

        const id = generateUniqueId();

        const contact = {
            id,
            email, 
            name, 
            subject,
            message,
            phone,
            created_at: today,
        }

        const res = await connection('contact_us').insert(contact)
        return response.json(res)
    }
}