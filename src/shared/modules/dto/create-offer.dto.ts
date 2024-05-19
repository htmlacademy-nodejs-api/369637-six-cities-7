import type { City, OfferType, Facilitie } from '../../types/offer.type.js';
import type { User } from '../../types/user.type.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public date: Date;
  public city: City;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public facilities: Facilitie[];
  public userId!: User;
  public comments?: number;
  public latitude: string;
  public longitude: string;
}
