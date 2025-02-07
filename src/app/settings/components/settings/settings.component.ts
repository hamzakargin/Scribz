import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser, selectIsSubmitting, selectValidationErrors} from '../../../auth/store/reducer';
import {combineLatest, filter, Observable, Subscription} from 'rxjs';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {
  BackendErrorMessagesComponent
} from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {CurrentUserRequestInterface} from '../../../shared/types/currentUserRequestInterface';
import {authActions} from '../../../auth/store/action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [BackendErrorMessagesComponent, CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule, ReactiveFormsModule,]
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup

  currentUser?: CurrentUserInterface;
  currentUserSubscription?: Subscription;
  data$!: Observable<{ isSubmitting: boolean; backendErrors: BackendErrorsInterface | null; }>


  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
  }

  ngOnInit() {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors)
    });
    this.currentUserSubscription = this.store.pipe(
      select(selectCurrentUser),
      filter(Boolean)
    ).subscribe(currentUser => {
      this.currentUser = currentUser;
      this.initializeForm();
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('User not found');
    }

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit() {
    if (!this.currentUser) {
      throw new Error('User not found');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      }
    }
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))

  }

  logout() {
    this.store.dispatch(authActions.logout())
  }
}
