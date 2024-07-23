import { Component, inject } from '@angular/core';
import { ThesisService } from '../../data/services/thesis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  thesisService = inject(ThesisService);

  constructor(private router: Router) {}

  addThesis() {
    this.router.navigate(['/add']);
  }

  searchThesis() {
    this.router.navigate(['']);
  }

  getAllTheses() {
    this.router.navigate(['/all']);
  }
}
