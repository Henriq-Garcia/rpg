import { Component } from '@angular/core';
import { LoginFormComponent } from "../forms/login-form/login-form.component";
import { RegisterFormComponent } from '../forms/register-form/register-form.component';
import { AlertService } from '../../_services/alert/alert.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  constructor (private readonly alertService: AlertService) {}
  
  activeForm: "login" | "register" = "login";

  onChangeActiveForm(formType: "login" | "register") {
    this.activeForm = formType;
  }

  login() {
    this.alertService.addAlert("Usuario ou senha incorretos", "error")
  }
}
