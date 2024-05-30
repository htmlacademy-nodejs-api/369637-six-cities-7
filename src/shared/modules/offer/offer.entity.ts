import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import type { OfferType, City, Facilitie } from '../../types/index.js';
// import type { User } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop()
  public name: string;

  @prop({ trim: true })
  public description: string;

  @prop()
  public date: Date;

  @prop()
  public city: City;

  @prop()
  public preview: string;

  @prop()
  public photos: string[];

  @prop()
  public isPremium: boolean;

  @prop()
  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop()
  public ratings: number[];

  public getRating() {
    return this.rating;
  }

  public setRating() {
    return (
      this.ratings.reduce((acc, cur) => acc + cur, 0) / this.ratings.length
    );
  }

  @prop()
  public type: OfferType;

  @prop()
  public roomsCount: number;

  @prop()
  public guestsCount: number;

  @prop()
  public price: number;

  @prop()
  public facilities: Facilitie[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public comments?: number;

  @prop()
  public latitude: string;

  @prop()
  public longitude: string;
}

export const OfferModel = getModelForClass(OfferEntity);
