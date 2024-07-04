import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSupportButtonComponent } from './live-support-button.component';

describe('LiveSupportButtonComponent', () => {
  let component: LiveSupportButtonComponent;
  let fixture: ComponentFixture<LiveSupportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveSupportButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveSupportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
