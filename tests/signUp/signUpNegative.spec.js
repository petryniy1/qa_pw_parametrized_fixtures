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
    user: {
      ...generateNewUserData(),
      username: '',
    },
    errorMessage: EMPTY_USERNAME_MESSAGE,
  },
  {
    title: 'empty email',
    user: {
      ...generateNewUserData(),
      email: '',
    },
    errorMessage: INVALID_EMAIL_MESSAGE,
  },
  {
    title: 'empty password',
    user: {
      ...generateNewUserData(),
      password: '',
    },
    errorMessage: EMPTY_PASSWORD_MESSAGE,
  },
];

testParameters.forEach(({ title, user, errorMessage }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);
      await signUpPage.assertErrorMessageContainsText(errorMessage);
    });
  });
});
