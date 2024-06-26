import { Component, OnInit } from '@angular/core';
import { ChatService } from '../core/services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ChatComponent implements OnInit {
  messages: { user: string, message: string }[] = [];
  userName: string = 'User1';  // Dinamik olarak oturum açan kullanıcı adı olarak değiştirilebilir
  adminName: string = 'Admin';  // Admin sabit olabilir veya oturum açan admin adı olabilir
  messageInput: string = '';  // input için bir değişken ekleyin
  isConnected: boolean = false;  // Bağlantı durumu için bir değişken ekleyin

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.startConnection(this.userName);
    this.chatService.addMessageListener((user, message) => {
      this.messages.push({ user, message });
    });

    // Bağlantı durumunu dinleyin
    this.chatService.isConnected.subscribe(isConnected => {
      this.isConnected = isConnected;
      if (isConnected) {
        console.log('Connected to chat server.');
      } else {
        console.log('Disconnected from chat server.');
      }
    });
  }

  public sendMessage() {
    if (this.isConnected) {
      this.chatService.sendMessage(this.userName, this.adminName, this.messageInput);
      this.messageInput = '';  // input'u temizleyin
    } else {
      console.error('Cannot send data if the connection is not in the "Connected" State.');
    }
  }

  public adminSendMessage() {
    if (this.isConnected) {
      this.chatService.adminSendMessage(this.adminName, this.userName, this.messageInput);
      this.messageInput = '';  // input'u temizleyin
    } else {
      console.error('Cannot send data if the connection is not in the "Connected" State.');
    }
  }
}