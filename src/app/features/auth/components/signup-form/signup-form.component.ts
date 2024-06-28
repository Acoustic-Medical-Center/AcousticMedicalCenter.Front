import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './validators/passwordMatchValidator';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...formValue } = this.signupForm.value;
      console.log('Form Submitted', formValue);

      this.authService.signup(formValue).subscribe({
        next: (response) => {
          this.toastr.success('Kayır Başarılı');
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error('Signup failed');
          console.log(error);
          
        },
      });
    } else {
      this.markAllAsTouched();
      this.toastr.warning('Form is not valid');
    }
  }

  markAllAsTouched() {
    Object.keys(this.signupForm.controls).forEach((controlName) => {
      const control = this.signupForm.get(controlName);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isPasswordMismatch(): boolean {
    const control = this.signupForm;
    return (
      control.hasError('passwordMismatch') && (control.dirty || control.touched)
    );
  }
}
