
exports.up = function(knex) {
    return knex.schema.createTable('waiting_list', function(table){
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('product').notNullable();
        table.string('sku').notNullable();
        table.string('link').notNullable();
        table.integer('status').notNullable();
        table.datetime('created_at').notNullable();
        table.datetime('updated_at').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('waiting_list');
};

/*
    STATUS: 1 POR ENVIAR
    STATUS: 2 ENVIADO
*/