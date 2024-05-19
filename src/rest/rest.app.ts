import { inject, injectable } from 'inversify';

import { getMongoURI } from '../shared/helpers/index.js';
import { Component } from '../shared/types/index.js';

import type { Logger } from '../shared/libs/logger/index.js';
import type { Config, RestSchema } from '../shared/libs/config/index.js';
import type { DatabaseClientInterface } from '../shared/libs/database-client/database-client.interface.js';

import { UserModel } from '../shared/modules/user/user.model.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClientInterface
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`$PORT: ${this.config.get('PORT')}`);

    this.logger.info('Initializing database…');
    await this.initDb();
    this.logger.info('Database initialized');

    const user = new UserModel({
      email: 'test123@emailru',
      avatar: 'keks3.jpg',
      firstname: '2',
      lastname: 'Unknown',
    });

    const error = user.validateSync();
    console.log(error);
  }
}
