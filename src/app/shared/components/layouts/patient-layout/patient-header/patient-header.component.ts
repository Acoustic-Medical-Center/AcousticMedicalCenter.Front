import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.scss',
})
export class PatientHeaderComponent {
  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private translate: TranslateService,
  ) {}

  isDropdownOpen = false;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  dropdownLanguageOpen = false;

  private clickListener!: () => void;

  date = Date.now();

  ngOnInit() {
    this.clickListener = this.renderer.listen('document', 'click', (e) => {
      if (
        this.isDropdownOpen &&
        this.dropdownMenu &&
        !this.dropdownMenu.nativeElement.contains(e?.target)
      ) {
      }
      this.isDropdownOpen = false;
      this.dropdownLanguageOpen = false;
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
    this.dropdownLanguageOpen = false;
  }

  toggleDropdownListItem() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.elRef.nativeElement.classList.toggle(
      'dropdown-open',
      this.isDropdownOpen,
    );
  }

  toggleLanguageDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownLanguageOpen = !this.dropdownLanguageOpen;
  }

  selectLanguage(lang: string): void {
    this.translate.use(lang);
    this.dropdownLanguageOpen = false; // Dili seçtikten sonra dropdown'u kapat
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isDropdownOpen = false;
    this.dropdownLanguageOpen = false;
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
