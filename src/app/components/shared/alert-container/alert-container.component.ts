import { Component } from '@angular/core';
import { AlertService } from '../../../_services/alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.scss'
})
export class AlertContainerComponent {

  constructor (private readonly alertService: AlertService) {};

  alerts$ = this.alertService.alerts$;

  removeAlert(id: number) {
    this.alertService.removeAlert(id);
  }
}
