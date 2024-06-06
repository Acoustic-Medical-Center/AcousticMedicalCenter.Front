import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.scss',
})
export class LogTableComponent {
  headers: string[] = [
    'Kullanıcı Adı',
    'Giriş Tarihi',
    'Randevu Tarihi',
    'İşlem Durumu',
  ];
  items = [
    {
      kullaniciAdi: 'user123',
      girisTarihi: '2024-06-01 10:00',
      randevuTarihi: '2024-06-05 15:00',
      islemDurumu: 'Tamamlandı',
    },
    {
      kullaniciAdi: 'user2',
      girisTarihi: '2024-06-02 11:00',
      randevuTarihi: '2024-06-06 16:00',
      islemDurumu: 'Beklemede',
    },
    {
      kullaniciAdi: 'user3',
      girisTarihi: '2024-06-03 12:00',
      randevuTarihi: '2024-06-07 17:00',
      islemDurumu: 'İptal Edildi',
    },
    {
      kullaniciAdi: 'user4',
      girisTarihi: '2024-06-04 13:00',
      randevuTarihi: '2024-06-08 18:00',
      islemDurumu: 'Tamamlandı',
    },
  ];
}
