import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalR';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveSupportService {
  private hubConnection: signalR.HubConnection;
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7172/chatHub`)
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addTransferChatDataListener(
    callback: (user: string, message: string) => void,
  ): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(user: string, message: string, room: string): void {
    this.hubConnection
      .invoke('SendMessage', user, message, room)
      .catch((err) => console.error(err));
  }

  public joinRoom(room: string): void {
    this.hubConnection
      .invoke('JoinRoom', room)
      .catch((err) => console.error(err));
  }

  public leaveRoom(room: string): void {
    this.hubConnection
      .invoke('LeaveRoom', room)
      .catch((err) => console.error(err));
  }
}
