import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonResource } from '../../data/interfaces/personResource.interface';

@Component({
  selector: 'other-authors-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './other-authors-card.component.html',
  styleUrl: './other-authors-card.component.scss',
})
export class OtherAuthorsCardComponent {
  @Input() authorForm! : FormGroup;

  @Output() removeEvent = new EventEmitter<void>();

  remove() {
    this.removeEvent.emit();
  }
}
