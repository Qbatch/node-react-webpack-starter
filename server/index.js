import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema';
import mongoConnector from './connectors/mongo';

const start = async () => {
  const mongo = await mongoConnector();
  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  });
};

start();
