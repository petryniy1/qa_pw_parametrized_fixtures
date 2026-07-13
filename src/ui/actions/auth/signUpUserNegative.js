import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function signUpUserNegative(page, user, userId = 0, errorMassge) {
  await testStep(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      const homePage = new HomePage(page, userId);

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);
      
      await signUpPage.assertErrorMessageContainsText(errorMassge);
    },
    userId,
  );
}
