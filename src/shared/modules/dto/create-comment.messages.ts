export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    minLength: 'min length is 5',
    maxLength: 'max length is 1024',
  },
  rating: {
    minValue: 'Minimum rating must be 1',
    maxValue: 'Maximum rating must be 5',
    invalidFormat: 'Rating must be a digit',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;
