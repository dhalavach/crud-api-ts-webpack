import { test, expect } from '@jest/globals';
import { userData } from '../../src/types.js';
export const checkIfRequiredFieldsArePresent = (userInfo: userData) => {
  if (userInfo.username && userInfo.age && userInfo.hobbies) return true;
  else return false;
};

const mockUserDataValid = {
  username: 'Joe',
  age: 80,
  hobbies: ['politics'],
};
test('function returns true when called with a valid user data', () => {
  expect(checkIfRequiredFieldsArePresent(mockUserDataValid) === true);
});
