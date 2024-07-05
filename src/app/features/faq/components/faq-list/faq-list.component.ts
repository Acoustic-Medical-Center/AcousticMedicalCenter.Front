import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-list.component.html',
  styleUrl: './faq-list.component.scss'
})
export class FaqListComponent {
  faqs = [
    {
      question: 'Hastane ziyaretleri için nasıl randevu alabilirim?',
      answer: 'Randevu almak için web sitemizi ziyaret edebilir, çağrı merkezimizi arayabilirsiniz.'
    },
    {
      question: 'Acil durumlarda hastanenizde ne yapmalıyım?',
      answer: 'Acil durumlar için hemen hastanemize gelmenizi öneririz. Acil servisimize yönlendirme için girişte personelimiz sizi karşılayacaktır.'
    },
    {
      question: 'Hangi sigorta şirketleri ile anlaşmanız var?',
      answer: 'Hastanemiz çeşitli sigorta şirketleri ile anlaşmalıdır. Detaylı bilgi için sigorta bölümümüz ile iletişime geçebilirsiniz.'
    },
    {
      question: 'Hastane odaları nasıl temizleniyor?',
      answer: 'Hastane odaları düzenli olarak profesyonel ekipler tarafından temizlenir ve dezenfekte edilir. Hijyen standartlarımız ulusal sağlık kurallarına uygundur.'
    },
    {
      question: 'Tedavi sürecimde ilaçlarımı nasıl almalıyım?',
      answer: 'Tedavi sürecinizde doktorunuz tarafından önerilen ilaçları düzenli olarak almalısınız. İlaç kullanımı ve dozajı hakkında detaylı bilgi almak için eczane bölümümüzü ziyaret edebilirsiniz.'
    },
    {
      question: 'Hastanenizde hangi tıbbi uzmanlıklar mevcut?',
      answer: 'Hastanemizde çeşitli tıbbi uzmanlık alanları bulunmaktadır. Doktorlarımızın uzmanlık alanları hakkında bilgi almak için web sitemizi ziyaret edebilirsiniz.'
    },
    {
      question: 'Hastane içindeki park yeri imkanları nelerdir?',
      answer: 'Hastanemizde hasta ve ziyaretçilerimiz için ücretsiz otopark imkanı bulunmaktadır. Park yeri hakkında daha fazla bilgi almak için resepsiyonumuza danışabilirsiniz.'
    }
    
];
}
