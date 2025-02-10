import { Component, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInPayload } from '../../../_dto/auth/auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor (private readonly formBuilderService: NonNullableFormBuilder) {}

  protected loginForm = this.formBuilderService.group({
    email: this.formBuilderService.control('', { 
      validators: [ 
        Validators.email, 
        Validators.required
      ]
    }),
    password: this.formBuilderService.control('', { 
      validators: [
        Validators.required, 
        Validators.minLength(8)
      ] 
    })
  })
  
  protected changeForm = output<"register">();
  protected loginFormData = output<SignInPayload>();

  protected emitLoginFormData() {
    this.loginFormData.emit(this.loginForm.value as SignInPayload);
  }

  protected emitChangeForm(){
    this.changeForm.emit("register");
  }
}
