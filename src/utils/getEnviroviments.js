require('dotenv/config');

module.exports = function getEnviroviments (){
    return {
        'host': process.env.HOST,
        'port': process.env.PORT,
        'service': process.env.SERVICE,
        'user': process.env.USERNAME,
        'pass': process.env.PASSWORD,
        'from': process.env.FROM,
        'site': process.env.SITE,
        'shop': process.env.SHOP,
        'from': process.env.FROM,
    }
}