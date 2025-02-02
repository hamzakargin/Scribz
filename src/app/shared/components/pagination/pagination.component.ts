import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() limit: number = 20;
  @Input() total: number = 0;
  @Input() url: string = '';

  pagesCount: number = 1;
  pages: number[] = [];
  constructor(private utilsService: UtilsService) {}
  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
