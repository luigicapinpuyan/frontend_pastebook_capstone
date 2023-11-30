import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestIndividualComponent } from './friend-request-individual.component';

describe('FriendRequestIndividualComponent', () => {
  let component: FriendRequestIndividualComponent;
  let fixture: ComponentFixture<FriendRequestIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendRequestIndividualComponent]
    });
    fixture = TestBed.createComponent(FriendRequestIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
