import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertContainerComponent } from "./components/shared/alert-container/alert-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rpg';
}
