import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
})
export class BranchListComponent implements OnInit {
  branches: any[] = []; // Observable yerine normal bir dizi

  constructor(private branchService: BranchService) {}

  doctors$ = this.branchService.doctors$;

  ngOnInit() {
    this.branchService.getBranches().subscribe({
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
    this.branchService.setSelectedBranchId(branchId);
  }
}
