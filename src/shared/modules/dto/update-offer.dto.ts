import type { City, OfferType, Facilitie } from '../../types/offer.type.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public date?: Date;
  public city?: City;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public type?: OfferType;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public facilities?: Facilitie[];
  public latitude?: string;
  public longitude?: string;
}
