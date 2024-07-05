import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnumTranslationService {
  translateAppointmentStatus(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'Planlanmış';
      case 'Completed':
        return 'Tamamlandı';
      case 'Canceled':
        return 'İptal Edildi';
      default:
        return status;
    }
  }
}
