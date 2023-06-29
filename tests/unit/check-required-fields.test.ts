const { checkIfRequiredFieldsArePresent } = require('./../../src/helpers.ts');
const { test, expect } = require('@jest/globals');

const mockUserDataValid = {
  username: 'Joe',
  age: '80',
  hobbies: 'politics',
};
test('function returns true when called with a valid user data', () => {
  expect(checkIfRequiredFieldsArePresent(mockUserDataValid) === true);
});
