const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi }= require('celebrate');

const WaitingListController = require('./controllers/WaitingListController');
const ContactUsController = require('./controllers/ContactUsController');

routes.get('/waiting_list/show',  WaitingListController.show);

routes.put('/waiting_list/update', celebrate({
    [Segments.BODY]: Joi.object().keys({
        sku: Joi.string().required(),
    })
}),  WaitingListController.update);

routes.post('/waiting_list/create',celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),        
        product: Joi.string().required(),        
        link: Joi.string().required(),        
        sku: Joi.string().required(),        
    })
}),  WaitingListController.create);

routes.get('/contact_us/show',  ContactUsController.show);

routes.post('/contact_us/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        subject: Joi.string().allow(null, ''),
        message: Joi.string().required(),
        phone: Joi.string().allow(null, ''),
        email: Joi.string().required().email(),        
    })
}),  ContactUsController.create);


module.exports = routes;