import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private router: Router) {}
  @Input() menuItems!: any[];

  isActive(link: string): boolean {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    };
    return this.router.isActive(link, matchOptions);
  }
}
