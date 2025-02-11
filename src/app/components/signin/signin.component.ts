import { Component } from '@angular/core';
import { LoginFormComponent } from "../forms/login-form/login-form.component";
import { RegisterFormComponent } from '../forms/register-form/register-form.component';
import { AlertService } from '../../_services/alert/alert.service';
import { CreateUserPayload } from '../../_dto/user/create-user';
import { UserService } from '../../_services/user/user.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { SignInPayload } from '../../_dto/auth/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  constructor (
    private readonly alertService: AlertService, 
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  
  activeForm: "login" | "register" = "login";

  onChangeActiveForm(formType: "login" | "register") {
    this.activeForm = formType;
  }

  login(data: SignInPayload) {
    this.authService.signIn(data).subscribe(
      (value) => {
        localStorage.setItem("token", value.token);
        localStorage.setItem("refresh", value.refreshToken)
        this.alertService.addAlert("Connecting", "success")
        this.router.navigate([""])
      },
      (error) => {
        this.alertService.addAlert("Invalid credentials", "error")
      }
    )
  }

  register(data: CreateUserPayload) {
    this.userService.createUser(data).subscribe(
      (value) => {
        this.alertService.addAlert("User created, redirecting to Login", "success")
        this.activeForm = "login"
      },
      (error) => {
        this.alertService.addAlert("Failed to create user", "error")
      }
    )
  }
}
