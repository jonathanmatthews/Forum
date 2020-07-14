import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsListingComponent } from './forums-listing.component';

describe('ForumsListingComponent', () => {
  let component: ForumsListingComponent;
  let fixture: ComponentFixture<ForumsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
