import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordService } from '../../services/password.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-password-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-form-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormPageComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const currentPassword =
        this.changePasswordForm.get('currentPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;

      this.passwordService
        .changePassword(currentPassword, newPassword)
        .pipe(
          catchError((error) => {
            console.error('Password change failed:', error);
            return throwError(() => error);
          }),
        )
        .subscribe({
          next: (response) => {
            console.log('Password change successfully:', response);
          },
          error: (error) => {
            // Ekstra error handling gerekiyorsa burada yapılabilir, catchError'den fırlatılan hatalar buraya düşer
          },
          complete: () => {
            console.log('Password change process completed.');
          },
        });
    }
  }
}
