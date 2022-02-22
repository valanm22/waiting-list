
exports.up = function(knex) {
    return knex.schema.createTable('contact_us', function(table){
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('name').notNullable();
        table.string('subject');
        table.string('message');
        table.string('phone');
        table.datetime('created_at').notNullable();
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('contact_us');
};
