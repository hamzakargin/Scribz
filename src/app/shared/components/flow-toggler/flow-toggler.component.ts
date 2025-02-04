import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-flow-toggler',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './flow-toggler.component.html',
  styleUrl: './flow-toggler.component.scss',
})
export class FlowTogglerComponent {
  @Input() tagName?: string;
  currentUser$;
  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }
}
