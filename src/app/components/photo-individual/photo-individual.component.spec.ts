import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoIndividualComponent } from './photo-individual.component';

describe('PhotoIndividualComponent', () => {
  let component: PhotoIndividualComponent;
  let fixture: ComponentFixture<PhotoIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoIndividualComponent]
    });
    fixture = TestBed.createComponent(PhotoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
