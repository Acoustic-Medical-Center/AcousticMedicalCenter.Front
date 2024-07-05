import { Component } from '@angular/core';
import { FaqListComponent } from '../../features/faq/components/faq-list/faq-list.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqListComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss'
})
export class FaqPageComponent {

}
