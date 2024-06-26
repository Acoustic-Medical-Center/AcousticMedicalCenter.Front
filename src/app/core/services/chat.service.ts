import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  public isConnected = new BehaviorSubject<boolean>(false);  // BehaviorSubject kullanarak bağlantı durumunu izleyin

  public startConnection(user: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7172/chatHub`)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.isConnected.next(true);  // Bağlantı kurulduğunda durumu güncelleyin
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        this.isConnected.next(false);  // Hata durumunda durumu güncelleyin
      });

    this.hubConnection.onclose(() => {
      this.isConnected.next(false);  // Bağlantı kapandığında durumu güncelleyin
    });
  }

  public addMessageListener(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      callback(user, message);
    });
  }

  public sendMessage(sender: string, receiver: string, message: string) {
    if (this.isConnected.value) {  // Bağlantı durumunu kontrol edin
      this.hubConnection.invoke('SendMessageToGroup', sender, receiver, message)
        .catch(err => console.error(err));
    } else {
      console.error('Cannot send data if the connection is not in the "Connected" State.');
    }
  }

  public adminSendMessage(sender: string, user: string, message: string) {
    if (this.isConnected.value) {  // Bağlantı durumunu kontrol edin
      this.hubConnection.invoke('SendMessageToGroup', sender, user, message)
        .catch(err => console.error(err));
    } else {
      console.error('Cannot send data if the connection is not in the "Connected" State.');
    }
  }
}