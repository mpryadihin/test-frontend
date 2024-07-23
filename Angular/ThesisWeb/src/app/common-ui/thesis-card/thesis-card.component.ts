import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThesisTableItemResource } from '../../data/interfaces/thesisTableItemResource.interface';
import { DatePipe } from '@angular/common';
import { OutletContext, Router } from '@angular/router';
import { ThesisService } from '../../data/services/thesis.service';
@Component({
  selector: 'thesis-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './thesis-card.component.html',
  styleUrl: './thesis-card.component.scss',
})
export class ThesisCardComponent {
  @Input() thesis!: ThesisTableItemResource;
  @Output() thesisDeleted = new EventEmitter<number>();

  constructor(private router: Router, private thesisService: ThesisService) {}

  openThesis() {
    this.router.navigate(['/thesis', this.thesis.id]);
  }

  deleteThesis() {
    this.thesisService.deleteThesis(this.thesis.id).subscribe({
      next: () => {
        this.thesisDeleted.emit(this.thesis.id);
      },
    });
  }
}
