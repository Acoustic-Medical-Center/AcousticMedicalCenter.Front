import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() leaveRoomEvent = new EventEmitter<void>();
  public messages: { user: string; message: string }[] = [];
  public currentMessage: string = '';
  public user: string = '';
  public userId: string = '';
  public room: string = ''; // Varsayılan olarak boş, kullanıcı belirleyecek
  public isRoomJoined: boolean = false; // Oda katılım durumu
  public typingUsers: Set<string> = new Set<string>();

  constructor(
    private chatService: LiveSupportService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.user = this.localStorageService.get('name') || 'User1';
    this.room = this.localStorageService.get('currentRoom') || '';
    this.userId = this.localStorageService.get('id') || 'undefined';
    this.chatService
      .startConnection()
      .then(() => {
        this.chatService.addTransferChatDataListener((user, message) => {
          this.messages.push({ user, message });
          this.saveMessages();
        });
        this.chatService.addTypingListener((user) => {
          this.typingUsers.add(user);
        });

        this.chatService.addStopTypingListener((user) => {
          this.typingUsers.delete(user);
        });
        if (this.room && !this.isRoomJoined) {
          this.joinRoom();
        } else {
          this.loadMessages();
        }
      })
      .catch((err) => console.error('Error starting connection:', err));
  }

  async joinRoom(): Promise<void> {
    if (this.room && !this.isRoomJoined) {
      try {
        await this.chatService.joinRoom(this.room, this.user);
        console.log(`Joined room: ${this.room}`);
        this.isRoomJoined = true; // Odaya katılım başarılı, chat penceresini aç
        this.localStorageService.set('currentRoom', this.room); // Oda bilgisini sakla
        this.loadMessages(); // Her odaya özgü mesajları yükleyin
      } catch (err: any) {
        console.error('Error joining room:', err);
      }
    } else {
      console.error('Oda adı belirtilmedi veya zaten katıldınız.');
    }
  }
  async createRoom(): Promise<void> {
    const newRoom = `${this.user} (${this.userId})`;
    if (newRoom) {
      try {
        await this.chatService.createRoom(newRoom);
        await this.chatService.joinRoom(newRoom, this.user);
        this.room = newRoom;
        this.localStorageService.set('currentRoom', this.room);
        this.isRoomJoined = true;
        this.messages = [];

        console.log(`Created and joined room: ${newRoom}`);
      } catch (err: any) {
        console.error('Error creating room:', err);
      }
    }
  }

  sendMessage(): void {
    if (this.room) {
      this.chatService.sendMessage(this.user, this.currentMessage, this.room);
      this.currentMessage = ''; // Mesaj gönderildikten sonra input'u temizle
      this.chatService.stopTyping(this.user, this.room);
    } else {
      console.error('Oda adı belirtilmedi.');
    }
  }
  onTyping(): void {
    this.chatService.startTyping(this.user, this.room);
  }

  onStopTyping(): void {
    this.chatService.stopTyping(this.user, this.room);
  }

  async leaveRoom(): Promise<void> {
    if (this.room) {
      try {
        await this.chatService.leaveRoom(this.room);
        this.chatService.removeRoomMessageListener();
        console.log(`Left room: ${this.room}`);
        this.isRoomJoined = false;
        this.room = '';
        this.messages = [];
        this.localStorageService.remove('currentRoom');
        this.leaveRoomEvent.emit();
      } catch (err: any) {
        console.error('Error leaving room:', err);
      }
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
