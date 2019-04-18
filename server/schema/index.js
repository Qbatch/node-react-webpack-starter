import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
// Define your types here.
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
  }
`;

// Generate the schema object from your types definition.
export default makeExecutableSchema({ typeDefs, resolvers });
