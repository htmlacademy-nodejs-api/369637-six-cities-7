export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatar: {
    invalidFormat: 'avatar is required',
  },
  firstName: {
    invalidFormat: 'firstname is required',
    minLength: 'minLength is 1',
    maxLength: 'maxLength is 15',
  },
  lastName: {
    invalidFormat: 'lastname is required',
    minLength: 'minLength is 1',
    maxLength: 'maxLength is 15',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12',
  },
  type: {
    invalid: 'Type must be "обычный" or "pro"',
  },
} as const;
