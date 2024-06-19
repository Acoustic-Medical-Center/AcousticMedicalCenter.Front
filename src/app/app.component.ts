import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicLayoutComponent } from './shared/components/layouts/basic-layout/basic-layout.component';
import { PatientLayoutComponent } from './shared/components/layouts/patient-layout/patient-layout.component';
import { DoctorLayoutComponent } from './shared/components/layouts/doctor-layout/doctor-layout.component';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthService } from './features/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './core/browser/services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    BasicLayoutComponent,
    PatientLayoutComponent,
    AdminLayoutComponent,
    DoctorLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
  ) {}

  userType = '';

  ngOnInit(): void {
    this.authService.getUserType().subscribe((userType) => {
      this.userType = userType;
    });

    const lang = this.localStorageService.get<string>('lang') || 'tr';
    this.translate.use(lang);
  }
}
