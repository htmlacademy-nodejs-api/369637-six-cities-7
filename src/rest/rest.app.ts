import { inject, injectable } from 'inversify';

import { getMongoURI } from '../shared/helpers/index.js';
import { Component } from '../shared/types/index.js';
import express, { Express } from 'express';

import type { LoggerInterface } from '../shared/libs/logger/index.js';
import type { Config, RestSchema } from '../shared/libs/config/index.js';
import type { DatabaseClientInterface } from '../shared/libs/database-client/database-client.interface.js';
import { ControllerInterface } from '../shared/libs/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../shared/libs/exception-filter/exception-filter.interface.js';

@injectable()
export class RestApp {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClientInterface,
    @inject(Component.CommentController)
    private readonly commentController: ControllerInterface,
    @inject(Component.UserController)
    private readonly userController: ControllerInterface,
    @inject(Component.OfferController)
    private readonly offerController: ControllerInterface,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilterInterface
  ) {
    this.server = express();
  }

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

  private async _initControllers() {
    this.server.use('/comments', this.commentController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initExceptionFilters() {
    this.server.use(
      this.appExceptionFilter.catch.bind(this.appExceptionFilter)
    );
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialized');

    this.logger.info('Initializing database…');
    await this.initDb();
    this.logger.info('Database initialized');

    this.logger.info('Initializing app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialized');

    this.logger.info('Initializing controllers');
    await this._initControllers();
    this.logger.info('Controllers initialized');

    this.logger.info('Initializing exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialized');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );

    this.server.get('/', (_req, res) => {
      res.send('Hello');
    });
  }
}
