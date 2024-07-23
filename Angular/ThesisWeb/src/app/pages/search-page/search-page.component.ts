import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThesisTableItemResource } from '../../data/interfaces/thesisTableItemResource.interface';
import { ThesisService } from '../../data/services/thesis.service';
import { Router, RouterOutlet } from '@angular/router';
import { ThesisCardComponent } from '../../common-ui/thesis-card/thesis-card.component';
import { NgIf, NgFor } from '@angular/common';
import { Pageable } from '../../data/interfaces/pageable.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, ThesisCardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  thesisService = inject(ThesisService);
  theses: ThesisTableItemResource[] = [];

  pageable!: Pageable;

  page: number = 1;
  pageSize: number = 1; //default

  sortings: any = { id: 'asc' };
  filters: any = {};

  constructor(private router: Router) {}

  onThesisDeleted(id: number): void {
    this.theses = this.theses.filter((thesis) => thesis.id !== id);
    this.loadItems();
  }

  getAllTheses() {
    this.router.navigate(['/all']);
  }

  addThesis() {
    this.router.navigate(['/add']);
  }

  ngOnInit() {
    this.loadItems();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadItems();
  }

  onSortChange(): void {
    const field = (document.getElementById('sortField') as HTMLSelectElement)
      .value;
    const order = (document.getElementById('sortOrder') as HTMLSelectElement)
      .value;
    this.sortings = { [field]: order };
    this.page = 1;
    this.loadItems();
  }

  resetFilters(): void {
    this.filters = {}; 
    this.page = 1;
    this.loadItems(); 
  }

  onNextPage() {
    if (this.page < this.pageable.totalPages) {
      this.page++;
      this.loadItems();
    }
  }

  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadItems();
    }
  }
  onPageChange(page: number) {
    if (page < 1 || page > this.pageable.totalPages) {
      return;
    }
    this.page = page;
    this.loadItems();
  }

  loadItems() {
    this.thesisService
      .getThesisPage(this.page, this.pageSize, this.sortings, this.filters)
      .subscribe((response) => {
        this.pageable = response;
      });
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newSize = Number(target.value);
    if (newSize > 0) {
      this.pageSize = newSize;
      this.page = 1; // Reset to first page whenever page size changes
      this.loadItems();
    }
  }
}
