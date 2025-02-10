import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();
  private nextId = 1;

  addAlert(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number = 3000) {
    const alert: Alert = { id: this.nextId++, message, type, duration };
    const currentAlerts = this.alertsSubject.getValue();
    this.alertsSubject.next([...currentAlerts, alert]);

    if (duration > 0) {
      setTimeout(() => this.removeAlert(alert.id), duration);
    }
  }

  removeAlert(id: number) {
    const currentAlerts = this.alertsSubject.getValue().filter(alert => alert.id !== id);
    this.alertsSubject.next(currentAlerts);
  }
}
