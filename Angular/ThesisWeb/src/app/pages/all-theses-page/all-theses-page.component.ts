import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThesisTableItemResource } from '../../data/interfaces/thesisTableItemResource.interface';
import { ThesisService } from '../../data/services/thesis.service';
import { NgFor, NgIf } from '@angular/common';
import { ThesisCardComponent } from '../../common-ui/thesis-card/thesis-card.component';

@Component({
  selector: 'app-all-theses-page',
  standalone: true,
  imports: [RouterOutlet, ThesisCardComponent, NgFor, NgIf],
  templateUrl: './all-theses-page.component.html',
  styleUrl: './all-theses-page.component.scss',
})
export class AllThesesPageComponent {
  thesisService = inject(ThesisService);
  theses: ThesisTableItemResource[] = [];

  constructor(private router: Router) {
    this.thesisService.getAllTheses().subscribe((val) => (this.theses = val));
  }

  addThesis() {
    this.router.navigate(['/add']);
  }
  onThesisDeleted(id: number): void {
    this.theses = this.theses.filter((thesis) => thesis.id !== id);
  }
}
