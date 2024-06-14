export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalid: 'City must be one of six cities',
  },
  preview: {
    maxLength: 'Too short for field preview',
  },
  rating: {
    minValue: 'Minimum rating must be 1',
    maxValue: 'Maximum rating must be 5',
    invalidFormat: 'Rating must be a digit',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100 000',
  },
  photos: {
    invalidFormat: 'photos must be an array',
    value: 'You must have exactly six photos',
  },
  roomsCount: {
    minValue: 'Minimum roomsCount must be 1',
    maxValue: 'Maximum roomsCount must be 8',
    invalidFormat: 'Rating must be a integer',
  },
  guestsCount: {
    minValue: 'Minimum guestsCount must be 1',
    maxValue: 'Maximum guestsCount must be 8',
    invalidFormat: 'guestsCount must be a integer',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  image: {
    maxLength: 'Too short for field «image»',
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  facilities: {
    invalidFormat: 'facilities must be an array',
    maxSize: 'facilities max size must be 7',
    invalid:
      'Available facilities: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  comments: {
    invalidFormat: 'comments must be an array',
  },
  ratings: {
    invalidFormat: 'ratings must be an array',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'coordinates must be an digit',
  },
} as const;
