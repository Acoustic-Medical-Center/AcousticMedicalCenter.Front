import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicLayoutComponent } from './shared/components/layouts/basic-layout/basic-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BasicLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AcousticMedicalCenter.Front';
}
