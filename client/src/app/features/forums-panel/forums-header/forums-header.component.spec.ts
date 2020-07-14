import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsHeaderComponent } from './forums-header.component';

describe('ForumsHeaderComponent', () => {
  let component: ForumsHeaderComponent;
  let fixture: ComponentFixture<ForumsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
