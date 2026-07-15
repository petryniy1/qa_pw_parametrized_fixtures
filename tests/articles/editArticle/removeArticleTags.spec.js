import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'fiveTags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Remove all tags from article', () => {
    test.use({
      articleTagsNumber: tagsNumber,
    });

    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all tags from article with ${testNameEnding}`, async ({
      articleWithTags,
      viewArticlePage,
      editArticlePage,
      page,
    }) => {
      const article = await createArticle(page, articleWithTags);

      await viewArticlePage.clickEditLink();
      await editArticlePage.deleteTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForURL(article.url);
      await page.reload();
      await viewArticlePage.assertArticleTagsIsDeleted(article.tags);
    });
  });
});
