import 'reflect-metadata';
import { Container } from 'inversify';

import { Component } from './shared/types/index.js';
import { RestApp } from './rest/rest.app.js';

import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const app = appContainer.get<RestApp>(Component.RestApp);
  await app.init();
}

bootstrap();
