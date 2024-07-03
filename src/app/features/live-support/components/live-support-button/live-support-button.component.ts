import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LiveSupportWindowComponent } from '../live-support-window/live-support-window.component';

@Component({
  standalone: true,
  selector: 'app-live-support-button',
  templateUrl: './live-support-button.component.html',
  styleUrls: ['./live-support-button.component.scss'],
  imports: [CommonModule, LiveSupportWindowComponent],
})
export class LiveSupportButtonComponent {
  isChatVisible = false;

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
