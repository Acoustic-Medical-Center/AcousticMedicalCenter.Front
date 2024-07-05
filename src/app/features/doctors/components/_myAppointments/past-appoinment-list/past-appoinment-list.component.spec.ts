import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppoinmentListComponent } from './past-appoinment-list.component';

describe('PastAppoinmentListComponent', () => {
  let component: PastAppoinmentListComponent;
  let fixture: ComponentFixture<PastAppoinmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastAppoinmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastAppoinmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
