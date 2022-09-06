exports.seed = async function(knex) {
  await knex('quotes').truncate()
  await knex('quotes').insert([
    {quote: "quote1", author: "author1"},
    {quote: "quote2", author: "author2"},
    {quote: "quote3", author: "author3"}
  ]);
};
