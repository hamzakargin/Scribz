import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FrequentTagsActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import {
  selectError,
  selectFrequentTagsData,
  selectIsLoading,
} from './store/reducers';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FrequentTagsState } from './types/frequentTagsState.interface';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-frequent-tags',
  templateUrl: './frequentTags.component.html',
  styleUrls: ['./frequentTags.component.scss'],
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorMessageComponent,
    RouterLink,
    MatCardModule,
    MatChipsModule,
  ],
})
export class FrequentTagsComponent implements OnInit {
  data$!: Observable<FrequentTagsState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FrequentTagsActions.getFrequentTags());
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      data: this.store.select(selectFrequentTagsData),
    });
  }
}
