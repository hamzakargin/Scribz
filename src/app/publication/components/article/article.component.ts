import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../../store/actions';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';

import { ArticleStateInterface } from '../../types/articleState.interface';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { TagListComponent } from '../../../shared/components/tag-list/tag-list.component';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    MatCardModule,
    MatIconModule,
  ],
})
export class ArticleComponent implements OnInit {
  slug!: string;
  data$!: Observable<{
    isLoading: boolean;
    article: ArticleInterface | null;
    error: string | null;
    isAuthor: boolean;
  }>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));

    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({ article, currentUser }) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      article: this.store.select(selectArticleData),
      error: this.store.select(selectError),
      isAuthor: this.isAuthor$,
    });
  }
  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
