import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from '../../types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  imports: [BackendErrorMessagesComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting?: boolean;
  @Input() errors: BackendErrorsInterface | null = null;
  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form: FormGroup;
  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      title: '',
      description: '',
      body: '',
      tagList: '',
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Initial values are required');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
