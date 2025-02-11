import { Component, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserPayload } from '../../../_dto/user/create-user';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  errors: string[] = []

  constructor (private readonly formBuilderService: NonNullableFormBuilder) {}
  
  protected registerForm = this.formBuilderService.group({
    name: this.formBuilderService.control('', {
      validators: [
        Validators.minLength(3),
        Validators.required
      ]
    }),
    email: this.formBuilderService.control('', {
      validators: [
        Validators.email,
        Validators.required
      ]
    }),
    password: this.formBuilderService.control('', {
      validators: [
        Validators.minLength(8),
        Validators.required
      ]
    }),
    confirmPassword: this.formBuilderService.control('', {
      validators: [
        Validators.minLength(8),
        Validators.required,
      ]
    })
  })

  protected changeForm = output<"login">();
  protected registerFormData = output<CreateUserPayload>(); 

  protected emitRegisterFormData() {
    if (this.registerForm.value.confirmPassword !== this.registerForm.value.password) {
      this.errors.push('Passwords does not match')
      return
    }
    const { confirmPassword, ...payload } = this.registerForm.value
    this.registerFormData.emit(payload as CreateUserPayload)
  }

  protected emitChangeForm(){
    this.changeForm.emit("login");
  }
}
