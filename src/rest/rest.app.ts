import { inject, injectable } from 'inversify';

import type { Logger } from '../shared/libs/logger/index.js';
import type { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`$PORT: ${this.config.get('PORT')}`);
  }
}
