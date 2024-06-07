import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private elRef: ElementRef,
  ) {}

  isDropdownOpen = false;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  private clickListener!: () => void;

  ngOnInit() {
    this.clickListener = this.renderer.listen('document', 'click', (e) => {
      if (
        this.isDropdownOpen &&
        this.dropdownMenu &&
        !this.dropdownMenu.nativeElement.contains(e?.target)
      ) {
      }
      this.isDropdownOpen = false;
    });
  }

  ngOnDestroy() {
    console.log('component yok edildi.');
    if (this.clickListener) {
      this.clickListener;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdownListItem() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.elRef.nativeElement.classList.toggle(
      'dropdown-open',
      this.isDropdownOpen,
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isDropdownOpen = false;
    console.log('mahmut');
    console.log(this.isDropdownOpen);
  }

  @HostListener('click')
  onClick() {
    console.log('cidden mi*?');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
