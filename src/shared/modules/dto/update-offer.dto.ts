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

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public name?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.title.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.postDate.invalidFormat }
  )
  public date?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.value })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.value })
  public photos?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  public guestsCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @ArrayMaxSize(7, { message: CreateOfferValidationMessage.facilities.maxSize })
  @IsEnum(Facilitie, {
    each: true,
    message: CreateOfferValidationMessage.facilities.invalid,
  })
  public facilities?: Facilitie[];

  @IsOptional()
  @Matches(/^\d+(\.\d{6})?$/, {
    message: CreateOfferValidationMessage.coordinates.invalidFormat,
  })
  public latitude?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{6})?$/, {
    message: CreateOfferValidationMessage.coordinates.invalidFormat,
  })
  public longitude?: string;

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId!: User;
}
