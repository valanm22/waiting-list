const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const dateNow = require('../utils/getDateNow');
const sendMail = require('../utils/sendMail');

module.exports = {
    async update(request, response){

        const {
            sku
        }  = request.body ;

        const sendTo = await connection('waiting_list')
                            .where('sku', sku)
                            .andWhere('status', 1)
                            .select('email','link','product');

        sendTo.forEach((send) => {

            const html = `
                    <h3>Seu produto já está disponível</h3>
                    <h3 style="color:#F29D36;" >${send.product}</h3>
                    <a href="${send.link}" 
                        style=" 
                            border: none;
                            border-radius: 3px;
                            padding: 10px 15px;
                            background: blue;
                            color: #fff;
                            outline: none;
                            cursor: pointer;
                            text-decoration:none;
                        ">
                        VER PRODUTO
                    </a>
                    `                           

            const mailOptions = {
                to: send.email,
                subject: `${send.product} já está disponível!`,
                html
            };

            sendMail(mailOptions);

        });

        const today = dateNow();

        const update = await connection('waiting_list')
                                    .update({
                                        'status': 2,
                                        'updated_at': today,
                                        })
                                    .where('sku', sku)
                                    .andWhere('status', 1);

        console.log(sendTo);
        console.log(update);

        return response.json({
            sended: sendTo,
            updated: update
        });
            
    },
    async show(request, response){
        const waiting_list = await connection('waiting_list').select('*');
        return response.json(waiting_list);
    },
    async create(request, response){
        
        const dateNow = require('../utils/getDateNow');

        const today = dateNow();

        const status = 1
        const {
            email, 
            product, 
            link, 
            sku,
        }  = request.body;

        const id = generateUniqueId();

        const wait = {
            id,
            email,
            product,
            link, 
            sku,
            status,
            created_at: today,
            updated_at: today,
        }

        const res = await connection('waiting_list').insert(wait)
        return response.json(res)
    },
}