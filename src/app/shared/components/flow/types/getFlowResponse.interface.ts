import { ArticleInterface } from '../../../types/article.interface';

export interface GetFlowResponseInterface {
  article: ArticleInterface[];
  articleCount: number;
}
