import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';

import { ArticleFormValuesInterface } from '../../../shared/types/articleFormValues.interface';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, filter, map, Observable } from 'rxjs';

import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';

import { Store } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { editArticleActions } from '../../store/actions';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';

@Component({
  selector: 'app-edit-article',
  imports: [
    LoadingComponent,
    CommonModule,
    ReactiveFormsModule,
    ArticleFormComponent,
  ],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit {
  // initialValues = {
  //   title: 'Title',
  //   description: 'Description',
  //   body: 'Body',
  //   tagList: [],
  // };

  data$!: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
    initialValues: ArticleFormValuesInterface | null;
  }>;
  slug: string = '';
  initialValues$: Observable<ArticleFormValuesInterface>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.initialValues$ = this.store.select(selectArticle).pipe(
      filter((article): article is ArticleInterface => article !== null),
      map((article: ArticleInterface) => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }))
    );
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
      isLoading: this.store.select(selectIsLoading),
      initialValues: this.initialValues$,
    });
  }
  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };

    this.store.dispatch(
      editArticleActions.updateArticle({ request, slug: this.slug })
    );
  }
}
