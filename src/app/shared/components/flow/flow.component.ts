import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {flowActions} from './store/actions';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {selectError, selectFlowData, selectIsLoading} from './store/reducers';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink,} from '@angular/router';

import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatIconModule} from '@angular/material/icon';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {LoadingComponent} from '../loading/loading.component';
import {PaginationComponent} from '../pagination/pagination.component';
import {environment} from '../../../../environments/environment.development';
import queryString from 'query-string';
import {TagListComponent} from '../tag-list/tag-list.component';
import {AddToFavoritesComponent} from '../add-to-favorites/add-to-favorites.component';

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
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.scss',
})
export class FlowComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  data$!: Observable<{ isLoading: boolean; error: any; flow: any }>;
  currentPage: number = 0;
  limit: number = environment.limit;
  baseUrl: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      flow: this.store.select(selectFlowData),
    });

    this.baseUrl = this.router.url.split('?')[0];
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page']) || 1;
      this.fetchFlow();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const apiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;
    if (apiUrlChanged) {
      this.fetchFlow();
    }
  }

  fetchFlow(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query,
    });
    const apiUrlsWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(flowActions.getFlow({url: apiUrlsWithParams}));
  }
}
