exports.seed = async function(knex) {
  await knex("quotes").truncate()
  await knex("users").truncate()
  await knex("favorites").truncate()
  await knex("quotes").insert([
    {quote: "Happiness is internal, not external; it does not depend on what we have, but on what we are.", author: "Pablo Neruda"},
    {quote: "It is only with the heart that one can see rightly; what is essential is invisible to the eye", author: "Antoine de Saint-Exupéry"},
    {quote: "I'm not lost for I know where I am. But however, where I am may be lost.", author: "A. A. Milne"}
  ]);
  await knex("users").insert([
    {username: "Test", password: "1111"}
  ])
  await knex("favorites").insert([
    {favoriteQuote: "testFavQuote", favoriteAuthor: "testFavAuth"}
  ])
};
