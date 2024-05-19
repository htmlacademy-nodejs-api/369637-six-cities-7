import { Container } from 'inversify';

import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { RestApp } from './rest.app.js';
import { Config, RestSchema, RestConfig } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import type { DatabaseClientInterface } from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container
    .bind<DatabaseClientInterface>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  return container;
}
