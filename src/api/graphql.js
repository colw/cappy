const { ApolloServer, gql } = require("apollo-server-lambda");
const { fetchSugar } = require("./latest.js");
const { fetchSugars } = require("./last24.js");

const typeDefs = gql`
  type Entry {
    sgv: Int
    direction: String
    dateString: String
  }

  type Query {
    entry: Entry
    entries: [Entry]
  }
`;

const resolvers = {
  Query: {
    entry: fetchSugar,
    entries: fetchSugars,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
