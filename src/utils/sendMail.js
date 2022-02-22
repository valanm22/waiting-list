const nodemailer = require('nodemailer');
const getEnviroviments = require('../utils/getEnviroviments');

module.exports = function sendMail (mailOptions){

    const {
        host,
        port,
        service,
        user,
        pass,
        site,
        shop,
        from,
    } = getEnviroviments();
    
    if(mailOptions.to == undefined){
        mailOptions.to = from;
    } 

    mailOptions.subject = `Aviso da ${shop}: ${mailOptions.subject}`;
    
    mailOptions.html = `${mailOptions.html}<p> <span style="color:#F29D36; font-weight: bold;" > ${shop} </span>todos os direitos reservados. Visite nosso <a target="_blank" href="${site}">site</a></p>`;

    const transporter = nodemailer.createTransport({
        host,
        port,
        service,
        secure: false, // true for 465, false for other ports
        auth: {
            user,
            pass
        },
        tls: { rejectUnauthorized: false }
    });
    
    const res = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return error
        } else {
            console.log(info.response);
            return info.response
        }
    });

}