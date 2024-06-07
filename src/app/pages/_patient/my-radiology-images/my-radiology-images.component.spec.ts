import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRadiologyImagesComponent } from './my-radiology-images.component';

describe('MyRadiologyImagesComponent', () => {
  let component: MyRadiologyImagesComponent;
  let fixture: ComponentFixture<MyRadiologyImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRadiologyImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRadiologyImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
