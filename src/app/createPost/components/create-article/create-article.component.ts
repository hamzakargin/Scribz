import { Component } from '@angular/core';
import { ArticleFormValuesInterface } from '../../../shared/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import { Store } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'app-create-article',
  imports: [ArticleFormComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  initialValues = {
    title: 'Title',
    description: 'Description',
    body: 'Body',
    tagList: [],
  };
  data$!: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
  }>;

  constructor(private store: Store) {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
