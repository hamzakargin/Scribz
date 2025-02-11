import {CommonModule} from '@angular/common'
import {Component, computed, inject, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router,} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {combineLatest, filter, map} from 'rxjs'


import {userProfileActions} from '../../store/actions'
import {selectError, selectIsLoading, selectUserProfileData,} from '../../store/reducers'
import {UserProfileInterface} from '../../types/userProfile.interface'
import {selectCurrentUser} from '../../../auth/store/reducer';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UserProfileComponent implements OnInit {
  route = inject(ActivatedRoute)
  store = inject(Store)
  router = inject(Router)
  slug: string = ''
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface =>
        Boolean(currentUser)
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser.username === userProfile.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  })

  isLoading = this.store.selectSignal(selectIsLoading)
  foo = computed(() => (this.isLoading() ? 'true' : 'false'))


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}

