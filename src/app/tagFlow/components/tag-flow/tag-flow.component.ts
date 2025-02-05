import { Component, OnInit } from '@angular/core';
import { FlowComponent } from '../../../shared/components/flow/flow.component';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

import { FrequentTagsComponent } from '../../../shared/components/frequentTags/frequentTags.component';
import { FlowTogglerComponent } from '../../../shared/components/flow-toggler/flow-toggler.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tag-flow',
  imports: [
    FlowComponent,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    BannerComponent,
    FrequentTagsComponent,
    FlowTogglerComponent,
  ],
  templateUrl: './tag-flow.component.html',
  styleUrl: './tag-flow.component.scss',
})
export class TagFlowComponent implements OnInit {
  apiUrl: string = '';
  tagName: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
