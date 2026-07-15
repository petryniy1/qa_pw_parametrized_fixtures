import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'fiveTags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add tags on article edit', () => {
    test.use({
      articleTagsNumber: tagsNumber,
    });

    test.beforeEach(async ({ page, user, articleWithoutTags }) => {
      await signUpUser(page, user);
      await createArticle(page, articleWithoutTags);
    });

    test(`Add ${testNameEnding} on article edit`, async ({
      viewArticlePage,
      editArticlePage,
      page,
      logger
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await viewArticlePage.clickEditLink();
      await editArticlePage.updateTagsField(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForURL(article.url);
      await page.reload();
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
    });
  });
});
