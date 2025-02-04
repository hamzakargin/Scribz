import { Component } from '@angular/core';
import { FlowComponent } from '../../../shared/components/flow/flow.component';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

import { FrequentTagsComponent } from '../../../shared/components/frequentTags/frequentTags.component';
import { FlowTogglerComponent } from '../../../shared/components/flow-toggler/flow-toggler.component';

@Component({
  selector: 'app-public-flow',
  imports: [
    FlowComponent,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    BannerComponent,
    FrequentTagsComponent,
    FlowTogglerComponent,
  ],
  templateUrl: './public-flow.component.html',
  styleUrl: './public-flow.component.scss',
})
export class PublicFlowComponent {
  apiUrl = '/articles';
}
