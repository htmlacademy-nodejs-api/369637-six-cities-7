import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import type { OfferServiceInterface } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';

export function createOfferContainer() {
  const container = new Container();

  container
    .bind<OfferServiceInterface>(Component.OfferService)
    .to(DefaultOfferService);
  container
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return container;
}
