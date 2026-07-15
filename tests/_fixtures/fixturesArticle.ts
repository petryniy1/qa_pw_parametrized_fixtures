import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { Logger } from '../../src/common/logger/Logger';

export interface Article {
  title: string;
  description: string;
  text: string;
  tags: string[];
}

export const test = base.extend<{
  articleWithoutTags: Article;
  articleWithOneTag: Article;
  articleWithTags: Article;
  articleTagsNumber: number;
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  logger: Logger;
}>({
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);

    await use(article);
  },
  articleTagsNumber: [0, { option: true }],

  articleWithTags: async ({ logger, articleTagsNumber }, use) => {
    const article = generateNewArticleData(logger, articleTagsNumber);

    await use(article);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
});
