import { testStep } from '../pwHelpers/pw';
import { signUpUser } from '../../ui/actions/auth/signUpUser';
import { createArticle } from '../../ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../ui/pages/article/ViewArticlePage';
import { HomePage } from '../../ui/pages/HomePage';

export async function signUpUsers(pages, users, startUserId = 1) {
  const testUsers = pages.map((page, index) => ({
    page,
    user: users[index],
    userId: startUserId + index,
  }));

  await testStep(`Sign up ${testUsers.length} users`, async () => {
    await Promise.all(
      testUsers.map(({ page, user, userId }) => signUpUser(page, user, userId)),
    );
  });
}

export async function createArticlesForEachUser(
  pages,
  articles,
  startUserId = 1,
) {
  const testUsers = pages.map((page, index) => ({
    page,
    article: articles[index],
    userId: startUserId + index,
  }));

  return await testStep(`Create ${testUsers.length} articles`, async () => {
    const createArticles = [];

    for (const testUser of testUsers) {
      const article = await createArticle(
        testUser.page,
        testUser.article,
        testUser.userId,
      );

      createArticles.push(article);
    }

    return createArticles;
  });
}

export async function setUpFollowBetweenUsers(
  pages,
  users,
  articles,
  startUserId = 1,
) {
  const testUsers = pages.map((page, index) => ({
    page,
    user: users[index],
    article: articles[index],
    userId: startUserId + index,
  }));

  await testStep(`Creating follow relationships`, async () => {
    for (const follower of testUsers) {
      const viewArticlePage = new ViewArticlePage(
        follower.page,
        follower.userId,
      );

      await testStep(
        `Follows all other users`,
        async () => {
          for (const author of testUsers) {
            if (author.userId === follower.userId) {
              continue;
            }

            await viewArticlePage.open(author.article.url);

            await viewArticlePage.assertFollowButtonIsVisible(
              author.user.username,
            );

            await viewArticlePage.clickFollowButton(author.user.username);

            await viewArticlePage.assertUnfollowButtonIsVisible(
              author.user.username,
            );
          }
        },

        follower.userId,
      );
    }
  });
}

export async function assertUsersCanSeeOwnObserves(
  pages,
  users,
  articles,
  startUserId = 1,
) {
  const testUsers = pages.map((page, index) => ({
    page,
    user: users[index],
    article: articles[index],
    userId: startUserId + index,
  }));

  await testStep(`Verify Your Feed`, async () => {
    for (const currentUser of testUsers) {
      const homePage = new HomePage(currentUser.page, currentUser.userId);

      await homePage.open();

      await testStep(
        `Verifies other users articles in "Your Feed"`,
        async () => {
          for (const articleOwner of testUsers) {
            if (articleOwner.userId === currentUser.userId) {
              continue;
            }

            await homePage.assertArticleTitleIsVisibleInYourlFeed(
              articleOwner.article.title,
            );

            await homePage.assertArticleAuthorIsVisible(
              articleOwner.user.username,
            );
          }
        },

        currentUser.userId,
      );
    }
  });
}
