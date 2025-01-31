import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { flowActions } from './store/actions';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectFlowData, selectIsLoading } from './store/reducers';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-flow',
  imports: [],
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
