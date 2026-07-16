import { test } from '../../_fixtures/fixtures';

import {
  signUpUsers,
  createArticlesForEachUser,
  setUpFollowBetweenUsers,
  assertUsersCanSeeOwnObserves,
} from '../../../src/common/multiUser/multiUserInterface';

let articles;

test.use({
  usersNumber: 3,
  contextsNumber: 3,
  newArticlesNumber: 3,
  articleTagsNumber: 3,
});

test.describe.configure({
  timeout: 180_000,
});

test.describe('Your Feed with multiple users', () => {
  test.beforeEach(async ({ pages, users, newArticles }) => {
    await signUpUsers(pages, users);

    articles = await createArticlesForEachUser(pages, newArticles);

    await setUpFollowBetweenUsers(pages, users, articles);
  });

  test('User can see in Your Feed articles from two different users', async ({
    pages,
    users,
  }) => {
    await assertUsersCanSeeOwnObserves(pages, users, articles);
  });
});
