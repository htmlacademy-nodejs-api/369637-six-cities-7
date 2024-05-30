import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  toggleIsFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: string): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  countRatingById(offerId: string): Promise<number | undefined>;
}
