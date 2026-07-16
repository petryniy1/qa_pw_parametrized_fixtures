import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editlink = page.getByRole('link', { name: 'Edit Article' }).first();
  }

  url() {
    return this.page.url();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByText(tagName, { exact: true });
  }

  followButton(username) {
    return this.page
      .getByRole('button', { name: `Follow ${username}` })
      .first();
  }

  unfollowButton(username) {
    return this.page
      .getByRole('button', { name: `Unfollow ${username}` })
      .first();
  }

  async open(url) {
    await this.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickEditLink() {
    await this.step(`Click the 'Edit Article' link`, async () => {
      await this.editlink.click();
    });
  }

  async clickFollowButton(username) {
    await this.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followButton(username).click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeVisible();
      }
    });
  }

  async assertArticleTagsIsDeleted(tags) {
    for (const tag of tags) {
      await this.step(
        `Assert the article tag "${tag}" is deleted`,
        async () => {
          await expect(this.page.getByText(tag)).toHaveCount(0);
        },
      );
    }
  }

  async assertFollowButtonIsVisible(username) {
    await this.step(
      `Assert the 'Follow ${username}' button is visible`,
      async () => {
        await expect(this.followButton(username)).toBeVisible();
      },
    );
  }

  async assertUnfollowButtonIsVisible(username) {
    await this.step(
      `Assert the 'Unfollow ${username}' button is visible`,
      async () => {
        await expect(this.unfollowButton(username)).toBeVisible();
      },
    );
  }
}
