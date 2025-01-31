import { Component } from '@angular/core';
import { FlowComponent } from '../../../shared/components/flow/flow.component';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-public-flow',
  imports: [FlowComponent, CommonModule, MatToolbarModule, MatCardModule],
  templateUrl: './public-flow.component.html',
  styleUrl: './public-flow.component.scss',
})
export class PublicFlowComponent {
  apiUrl = '/articles';
}
