import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tag-list',
  imports: [CommonModule, MatChipsModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
