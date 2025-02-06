import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .put<{ article: ArticleInterface }>(fullUrl, { article: articleRequest })
      .pipe(map((response) => response.article));
  }
}
