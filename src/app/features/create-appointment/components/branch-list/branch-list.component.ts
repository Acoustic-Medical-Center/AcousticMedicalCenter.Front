import { Component, OnInit } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
})
export class BranchListComponent implements OnInit {
  branches: any[] = [];
  doctors$ = this.createAppointmentService.doctors$;
  activeBranchId: number | null = null;
  constructor(private createAppointmentService: CreateAppointmentService) {}
  ngOnInit() {
    this.createAppointmentService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        console.log('Branches loaded:', this.branches);
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      },
    });
  }
  onSelectBranch(branchId: number) {
    this.activeBranchId = branchId;
    this.createAppointmentService.setSelectedBranchId(branchId);
  }
}
