import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalR';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveSupportService {
  public _isRoomJoined: boolean = false;
  private hubConnection: signalR.HubConnection;
  private baseUrl: string = ' https://localhost:7172/chatHub';
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .build();
  }

  public startConnection(): Promise<void> {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      return this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started');
          this.hubConnection.on('RoomCreated', (room: string) => {
            // Oda oluşturma olayını bileşenlere iletin
            this.onRoomCreated(room);
          });
        })
        .catch((err) => {
          console.log('Error while starting connection: ' + err);
          throw err; // Hata durumunu handle edebilmek için hatayı yeniden fırlat
        });
    }
    return Promise.resolve(); // Eğer bağlantı zaten kurulmuşsa Promise çözümlenir
  }

  public onRoomCreated(room: string): void {
    // Oda oluşturma olayını dinleyen bileşenler için bir metod
    console.log(`New room created: ${room}`);
  }

  public addTransferChatDataListener(
    callback: (user: string, message: string) => void,
  ): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public addRoomMessageListener(
    room: string,
    callback: (user: string, message: string) => void,
  ): void {
    this.hubConnection.on('ReceiveMessage', (user, message, receivedRoom) => {
      if (receivedRoom === room) {
        console.log('geliyor mu hiç bişi?');
        callback(user, message);
      }
    });
  }

  public sendMessage(user: string, message: string, room: string): void {
    this.hubConnection
      .invoke('SendMessage', user, message, room)
      .catch((err) => console.error(err));
  }

  public joinRoom(room: string, user: string): void {
    this.hubConnection
      .invoke('JoinRoom', room, user)
      .catch((err) => console.error(err));
  }

  public leaveRoom(room: string, user: string): Promise<void> {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return this.hubConnection.invoke('LeaveRoom', room, user);
    }
    return Promise.reject('Cannot leave room. Connection is not established.');
  }

  public createRoom(room: string): Promise<void> {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return this.hubConnection.invoke('CreateRoom', room);
    }
    return Promise.reject('Cannot create room. Connection is not established.');
  }

  public removeRoomMessageListener(): void {
    this.hubConnection.off('ReceiveMessage');
  }

  public addTypingListener(callback: (user: string) => void): void {
    console.log('Typing Dinleniyor mu');
    this.hubConnection.on('UserTyping', callback);
  }

  public addStopTypingListener(callback: (user: string) => void): void {
    this.hubConnection.on('UserStoppedTyping', callback);
  }

  public startTyping(user: string, room: string): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke('StartTyping', user, room)
        .catch((err) => console.error(err));
    }
  }

  public stopTyping(user: string, room: string): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke('StopTyping', user, room)
        .catch((err) => console.error(err));
    }
  }

  setIsRoomJoined(value: boolean): void {
    this._isRoomJoined = value;
  }
}
