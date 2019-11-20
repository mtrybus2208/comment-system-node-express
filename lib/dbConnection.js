import mongoose from 'mongoose';
import chalk from 'chalk';

import { devConfig } from '../config/dbDevConfig';

const connectionString =
  process.env.MONGODB_CONNECTION_STRING ||
  `mongodb://${devConfig.database.host}:${devConfig.database.port}/${devConfig.database.name}`;

export const dbInitializeConnection = () => {
  mongoose.Promise = Promise;

  const db = mongoose.connection;
  db.on('error', error => {
    console.error(chalk.red(`There was an error connecting to the database ${error}`));
  });
  db.once('open', () => {
    // eslint-disable-next-line
    console.log(chalk.blue('Successfully connected to database.'));
  });

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

