import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPageComponent } from './photo-page.component';

describe('PhotoPageComponent', () => {
  let component: PhotoPageComponent;
  let fixture: ComponentFixture<PhotoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoPageComponent]
    });
    fixture = TestBed.createComponent(PhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
