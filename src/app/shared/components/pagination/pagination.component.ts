import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get isNextDisabled(): boolean {
    return this.currentPage * this.pageSize >= this.totalItems;
  }

  constructor() {}

  ngOnInit(): void {}

  changePage(page: number) {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.pageChange.emit(page);
    }
  }
}
