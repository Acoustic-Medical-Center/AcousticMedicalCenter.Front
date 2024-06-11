import { Component } from '@angular/core';
import { SettingsPageComponent } from '../_auth/settings-page/settings-page.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsPageComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  
}
