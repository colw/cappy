const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Entry {
    sgv: Int
    direction: String
    dateString: String
  }

  type Query {
    entry: Entry
  }
`;

const resolvers = {
  Query: {
    entry: () => ({
      sgv: 100,
      direction: "Flat",
      dateString: "2020-06-29T07:19:29.476Z",
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
