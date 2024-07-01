import { Component, Input, OnInit } from '@angular/core';
import { LiveSupportService } from '../../services/live-support.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-live-support-window',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './live-support-window.component.html',
  styleUrl: './live-support-window.component.scss',
})
export class LiveSupportWindowComponent implements OnInit {
  public messages: { user: string; message: string }[] = [];
  public currentMessage: string = '';
  public user: string = '';
  public room: string = ''; // Varsayılan olarak boş, kullanıcı belirleyecek
  public isRoomJoined: boolean = false; // Oda katılım durumu
  @Input() isWindowOpen: any;

  constructor(
    private chatService: LiveSupportService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.user = this.localStorageService.get('name') || 'User1';
    this.room = this.localStorageService.get('currentRoom') || '';
    this.loadMessages();
    this.chatService.startConnection();
    this.chatService.addTransferChatDataListener((user, message) => {
      this.messages.push({ user, message });
      this.saveMessages();
    });
  }

  async joinRoom(): Promise<void> {
    if (this.room) {
      try {
        await this.chatService.joinRoom(this.room);
        console.log(`Joined room: ${this.room}`);
        this.isRoomJoined = true; // Odaya katılım başarılı, chat penceresini aç,
        console.log(this.isRoomJoined);
        this.localStorageService.set('currentRoom', this.room);
        this.loadMessages(); // Her odaya özgü mesajları yükleyin
      } catch (err: any) {
        console.error('Error joining room:', err);
      }
    } else {
      console.error('Oda adı belirtilmedi.');
    }
  }

  sendMessage(): void {
    if (this.room) {
      this.chatService.sendMessage(this.user, this.currentMessage, this.room);
      this.currentMessage = '';
    } else {
      console.error('Oda adı belirtilmedi.');
    }
  }

  clearMessages(): void {
    this.messages = [];
    this.saveMessages();
  }

  private saveMessages(): void {
    this.localStorageService.set(
      'chatMessages_' + this.room,
      JSON.stringify(this.messages),
    );
  }

  private loadMessages(): void {
    const savedMessages = this.localStorageService.get<string>(
      'chatMessages_' + this.room,
    );
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.messages = [];
    }
  }
}
