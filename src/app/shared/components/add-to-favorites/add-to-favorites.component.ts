import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {addToFavoritesActions} from './store/actions';


@Component({
  selector: 'app-add-to-favorites',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''

  constructor(private store: Store) {
  }

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    )
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorited = !this.isFavorited
  }
}
