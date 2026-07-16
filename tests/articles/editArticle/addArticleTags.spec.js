import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

let article;

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
      article = await createArticle(page, articleWithoutTags);
    });

    test(`Add ${testNameEnding} on article edit`, async ({
      viewArticlePage,
      editArticlePage,
      page,
      logger,
    }) => {
      const newTags = generateNewArticleData(logger, tagsNumber).tags;

      await viewArticlePage.clickEditLink();
      await editArticlePage.updateTagsField(newTags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForURL(article.url);
      await page.reload();
      await viewArticlePage.assertArticleTagsAreVisible(newTags);
    });
  });
});
