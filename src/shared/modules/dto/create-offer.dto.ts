import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  Matches,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

import { City, OfferType, Facilitie } from '../../types/offer.type.js';
import type { User } from '../../types/user.type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public name: string;

  @MinLength(20, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.title.maxLength })
  public description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.postDate.invalidFormat }
  )
  public date: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.value })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.value })
  public photos: string[];

  public isPremium: boolean;

  public isFavorite: boolean;

  // @Matches(/^\d+(\.\d{1})?$/, {
  // message: CreateOfferValidationMessage.rating.invalidFormat,
  // })
  // @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  // @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  // public rating: number;

  // @IsOptional()
  // @IsArray({ message: CreateOfferValidationMessage.ratings.invalidFormat })
  // public ratings: number[];

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  public guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @ArrayMaxSize(7, { message: CreateOfferValidationMessage.facilities.maxSize })
  @IsEnum(Facilitie, {
    each: true,
    message: CreateOfferValidationMessage.facilities.invalid,
  })
  public facilities: Facilitie[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId!: User;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.comments.invalidFormat })
  public comments?: number;

  @Matches(/^\d+(\.\d{6})?$/, {
    message: CreateOfferValidationMessage.coordinates.invalidFormat,
  })
  public latitude: string;

  @Matches(/^\d+(\.\d{6})?$/, {
    message: CreateOfferValidationMessage.coordinates.invalidFormat,
  })
  public longitude: string;
}
