exports.up = function(knex) {
    return knex.schema
    .createTable("quotes", tbl => {
        tbl.increments()
        tbl.text("quote", 150)
            .notNullable()
        tbl.text("author", 150)
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("quotes")
};
