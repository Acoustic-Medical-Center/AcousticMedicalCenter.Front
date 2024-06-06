import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiseasesComponent } from './my-diseases.component';

describe('MyDiseasesComponent', () => {
  let component: MyDiseasesComponent;
  let fixture: ComponentFixture<MyDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDiseasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
