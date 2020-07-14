import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsPanelComponent } from './forums-panel.component';

describe('ForumsPanelComponent', () => {
  let component: ForumsPanelComponent;
  let fixture: ComponentFixture<ForumsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
