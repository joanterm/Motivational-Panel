exports.up = function(knex) {
    return knex.schema
    .createTable("quotes", tbl => {
        tbl.increments()
        tbl.text("quote", 150)
            .notNullable()
        tbl.text("author", 150)
            .notNullable()
    })
    .createTable("users", tbl => {
        tbl.increments()
        tbl.text("username", 150)
            .notNullable()
            .unique()
        tbl.text("password", 150)
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("quotes")
    .dropTableIfExists("users")
};
