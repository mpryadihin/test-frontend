import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThesisCardComponent } from './common-ui/thesis-card/thesis-card.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThesisCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Тезисы';
  
}
