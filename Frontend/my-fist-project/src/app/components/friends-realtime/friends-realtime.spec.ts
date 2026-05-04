import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRealtime } from './friends-realtime';

describe('FriendsRealtime', () => {
  let component: FriendsRealtime;
  let fixture: ComponentFixture<FriendsRealtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsRealtime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsRealtime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
