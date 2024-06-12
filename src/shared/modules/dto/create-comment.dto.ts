import {
  IsMongoId,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @MinLength(5, { message: CreateCommentMessages.text.minLength })
  @MaxLength(1024, { message: CreateCommentMessages.text.maxLength })
  public text: string;

  @Matches(/^\d+(\.\d{1})?$/, {
    message: CreateCommentMessages.rating.invalidFormat,
  })
  @Min(1, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId: string;
}
