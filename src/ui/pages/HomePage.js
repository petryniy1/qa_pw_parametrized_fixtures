import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  authorArticleHeaderLink(username) {
    return this.page.getByRole('link', { name: username });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisibleInYourlFeed(title) {
    await this.step(
      `Assert article '${title}' is visible in Your Feed`,
      async () => {
        await expect(
          this.page.getByRole('heading').filter({ hasText: title }),
        ).toBeVisible();
      },
    );
  }

  async assertArticleAuthorIsVisible(username) {
    const userNameToLower = username.toLowerCase();

    await this.step(
      `Assert article has '${username}' author name in Global Feed`,
      async () => {
        await expect(
          this.authorArticleHeaderLink(userNameToLower),
        ).toContainText(userNameToLower);
      },
    );
  }

  async assertArticleTitleIsVisibleInYourlFeed(title) {
    await this.step(
      `Assert article '${title}' is visible in Your Feed`,
      async () => {
        await expect(
          this.page.getByRole('heading').filter({ hasText: title }),
        ).toBeVisible();
      },
    );
  }
}
