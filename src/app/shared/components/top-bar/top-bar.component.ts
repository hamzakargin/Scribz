import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  data$!: Observable<{ currentUser: any }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });
  }
}
