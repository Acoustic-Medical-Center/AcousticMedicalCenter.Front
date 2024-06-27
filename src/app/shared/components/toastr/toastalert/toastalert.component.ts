import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastalert',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './toastalert.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastalertComponent {

  constructor(private toastr: ToastrService){}
  showSuccess(){
    this.toastr.success('İşlem Başarıyla Tamamlandı.','Başarılı');
  }

  showError(){
    this.toastr.error('İşlem Başarısız','Başarısız');
  }

  showWarning(){
    this.toastr.warning('Hatalı İşlem', 'Hata');
  }

  showInfo(){
    this.toastr.info('İnfo', 'İnfo');
  }
}
