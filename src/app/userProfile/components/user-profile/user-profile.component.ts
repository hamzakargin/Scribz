import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {userProfileActions} from '../../store/actions';
import {combineLatest, filter, Observable} from 'rxjs';
import {UserProfileInterface} from '../../types/userProfile.interface';

import {selectError, selectIsLoading, selectUserProfileData} from '../../store/reducers';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {selectCurrentUser} from '../../../auth/store/reducer';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  slug: string = ''
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface => Boolean(currentUser))
    )
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface => Boolean(userProfile))
    )
  })
  data$!: Observable<{ isLoading: boolean; error: string | null; userProfile: UserProfileInterface | null; }>

  constructor(private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile()

    })
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfileData)
    })
  }

  fetchUserProfile() {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
  }
}
