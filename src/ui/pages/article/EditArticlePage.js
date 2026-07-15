import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textBody = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async deleteTags(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return;

    for (const tag of tagsArray) {
      await this.step(`Delete tag: "${tag}"`, async () => {
        await this.page
          .locator('span')
          .filter({ hasText: tag })
          .locator('i')
          .click();
      });
    }
  }

    async updateTagsField(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return;

    for (const tag of tagsArray) {
      await this.step(`Update filed with tag: "${tag}"`, async () => {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      });
    }
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
