import { Component, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { authActions } from '../../store/action';

import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducer';

import { CommonModule } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrosMessages/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  data$!: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
  }>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
