import { Component } from '@angular/core';
import { ThesisResource } from '../../data/interfaces/thesisResource.interface';
import { ThesisService } from '../../data/services/thesis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thesis-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thesis-page.component.html',
  styleUrl: './thesis-page.component.scss',
})
export class ThesisPageComponent {
  thesisResource!: ThesisResource;

  constructor(
    private route: ActivatedRoute,
    private thesisService: ThesisService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.thesisService.getThesisById(id).subscribe((data) => {
        this.thesisResource = data;
      });
    });
  }

  editThesis(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
