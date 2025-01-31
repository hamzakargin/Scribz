import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { flowActions } from './store/actions';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectFlowData, selectIsLoading } from './store/reducers';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatIconModule } from '@angular/material/icon';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-flow',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ErrorMessageComponent,
    LoadingComponent,
  ],
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.scss',
})
export class FlowComponent implements OnInit {
  @Input() apiUrl: string = '';
  data$!: Observable<{ isLoading: boolean; error: any; flow: any }>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      flow: this.store.select(selectFlowData),
    });
    this.store.dispatch(flowActions.getFlow({ url: this.apiUrl }));
  }
}
