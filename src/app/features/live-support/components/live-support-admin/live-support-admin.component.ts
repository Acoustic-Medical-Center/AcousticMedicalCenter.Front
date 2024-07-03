import { Component, OnInit } from '@angular/core';
import { LiveSupportService } from '../../services/live-support.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-live-support-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-support-admin.component.html',
  styleUrl: './live-support-admin.component.scss',
})
export class LiveSupportAdminComponent implements OnInit {
  public newRooms: string[] = [];
  public room: string = ''; // Varsayılan olarak boş, kullanıcı belirleyecek
  public isRoomJoined: boolean = false; // Oda katılım durumu
  public user: string = 'Admin'; // Varsayılan kullanıcı adı (admin)
  public currentMessage: string = ''; // Gönderilecek mesaj
  public messages: { user: string; message: string }[] = [];
  public typingUsers: Set<string> = new Set<string>(); // Yazıyor durumundaki kullanıcılar

  constructor(
    private liveSupportService: LiveSupportService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    // Oda listesini ve mesajları localStorage'dan yükleyin
    this.loadRooms();
    this.loadMessages();

    this.liveSupportService.startConnection().then(() => {
      this.liveSupportService.onRoomCreated = (room: string) => {
        this.newRooms.push(room);
        this.saveRooms();
      };
      this.liveSupportService.addTransferChatDataListener((user, message) => {
        if (this.room) {
          this.messages.push({ user, message });
          this.saveMessages();
        }
      });
      this.liveSupportService.addTypingListener((user) => {
        this.typingUsers.add(user);
      });
      this.liveSupportService.addStopTypingListener((user) => {
        this.typingUsers.delete(user);
      });
    });
  }

  async joinRoom(room: string): Promise<void> {
    this.room = room;
    if (this.room) {
      try {
        await this.liveSupportService.joinRoom(this.room, this.user);
        console.log(`Joined room: ${this.room}`);
        this.isRoomJoined = true; // Odaya katılım başarılı, chat penceresini aç
        this.messages = [];
        this.loadMessages(); // Odaya ait mesajları yükle
      } catch (err: any) {
        console.error('Error joining room:', err);
      }
    } else {
      console.error('Oda adı belirtilmedi.');
    }
  }

  async leaveRoom(room: string): Promise<void> {
    if (room) {
      try {
        await this.liveSupportService.leaveRoom(room);
        console.log(`Left room: ${room}`);
        if (this.room === room) {
          this.isRoomJoined = false;
          this.room = '';
          this.messages = [];
        }
        this.removeRoomFromLocalStorage(room);
        this.newRooms = this.newRooms.filter((r) => r !== room);
        this.saveRooms();
      } catch (err: any) {
        console.error('Error leaving room:', err);
      }
    }
  }

  sendMessage(): void {
    if (this.room && this.user) {
      this.liveSupportService.sendMessage(
        this.user,
        this.currentMessage,
        this.room,
      );
      this.currentMessage = ''; // Mesaj gönderildikten sonra input'u temizle
      this.liveSupportService.stopTyping(this.user, this.room);
    } else {
      console.error('Oda veya kullanıcı adı belirtilmedi.');
    }
  }

  onTyping(): void {
    this.liveSupportService.startTyping(this.user, this.room);
  }

  onStopTyping(): void {
    this.liveSupportService.stopTyping(this.user, this.room);
  }

  private saveRooms(): void {
    this.localStorageService.set('chatRooms', this.newRooms);
  }

  private loadRooms(): void {
    const savedRooms = this.localStorageService.get<string[]>('chatRooms');
    if (savedRooms) {
      this.newRooms = savedRooms;
    }
  }

  private saveMessages(): void {
    if (this.room) {
      this.localStorageService.set('chatMessages_' + this.room, this.messages);
    }
  }

  private loadMessages(): void {
    if (this.room) {
      const savedMessages = this.localStorageService.get<
        { user: string; message: string }[]
      >('chatMessages_' + this.room);
      if (savedMessages) {
        this.messages = savedMessages;
      }
    }
  }

  private removeRoomFromLocalStorage(room: string): void {
    this.localStorageService.remove('chatMessages_' + room);
  }
}
