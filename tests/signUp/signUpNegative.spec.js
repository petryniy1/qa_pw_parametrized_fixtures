import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const testParameters = [
  {
    title: 'empty username',
    overrides: { username: '' },
    errorMessage: EMPTY_USERNAME_MESSAGE,
  },
  {
    title: 'empty email',
    overrides: { email: '' },
    errorMessage: INVALID_EMAIL_MESSAGE,
  },
  {
    title: 'empty password',
    overrides: { password: '' },
    errorMessage: EMPTY_PASSWORD_MESSAGE,
  },
];

testParameters.forEach(({ title, overrides, errorMessage }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage, logger }) => {
      const user = {
        ...generateNewUserData(logger),
        ...overrides,
      };

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);
      await signUpPage.assertErrorMessageContainsText(errorMessage);
    });
  });
});