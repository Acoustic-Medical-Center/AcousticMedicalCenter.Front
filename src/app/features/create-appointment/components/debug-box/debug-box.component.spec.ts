import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugBoxComponent } from './debug-box.component';

describe('DebugBoxComponent', () => {
  let component: DebugBoxComponent;
  let fixture: ComponentFixture<DebugBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebugBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
