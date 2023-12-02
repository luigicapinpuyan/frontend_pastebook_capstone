import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmeModalComponent } from './aboutme-modal.component';

describe('AboutmeModalComponent', () => {
  let component: AboutmeModalComponent;
  let fixture: ComponentFixture<AboutmeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutmeModalComponent]
    });
    fixture = TestBed.createComponent(AboutmeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
