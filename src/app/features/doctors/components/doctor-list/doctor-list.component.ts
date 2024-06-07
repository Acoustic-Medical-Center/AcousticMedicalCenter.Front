import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent {
  doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatology',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Neurology',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedics',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Dr. Linda Davis',
      specialty: 'Pediatrics',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Dr. Robert Wilson',
      specialty: 'Psychiatry',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Dr. Patricia Moore',
      specialty: 'Radiology',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      name: 'Dr. James Taylor',
      specialty: 'Surgery',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];
}
