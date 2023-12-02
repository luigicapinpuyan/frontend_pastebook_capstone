import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumModalComponent } from './add-album-modal.component';

describe('AddAlbumModalComponent', () => {
  let component: AddAlbumModalComponent;
  let fixture: ComponentFixture<AddAlbumModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAlbumModalComponent]
    });
    fixture = TestBed.createComponent(AddAlbumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
