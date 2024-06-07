import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-branch-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-selection.component.html',
  styleUrl: './branch-selection.component.scss',
})
export class BranchSelectionComponent {
  branches = [
    { name: 'Beslenme ve Diyet', icon: 'path/to/icon1.png' },
    { name: 'Beyin ve Sinir Cerrahisi', icon: 'path/to/icon2.png' },
    { name: 'Çocuk Sağlığı ve Hastalıkları', icon: 'path/to/icon3.png' },
    { name: 'Dermatoloji', icon: 'path/to/icon4.png' },
    { name: 'Diğer Dallar', icon: 'path/to/icon5.png' },
    { name: 'Fiziksel Tıp ve Rehabilitasyon', icon: 'path/to/icon6.png' },
    { name: 'Gastroenteroloji', icon: 'path/to/icon7.png' },
    { name: 'Genel Cerrahi', icon: 'path/to/icon8.png' },
    { name: 'Göğüs Hastalıkları', icon: 'path/to/icon9.png' },
    { name: 'Göz Hastalıkları', icon: 'path/to/icon10.png' },
    { name: 'İç Hastalıkları', icon: 'path/to/icon11.png' },
  ];

  constructor(private appointmentService: AppointmentService) {}

  selectedBranch$ = this.appointmentService.selectedBranch$;

  selectBranch(branch: any) {
    this.appointmentService.selectBranch(branch);
  }
}
