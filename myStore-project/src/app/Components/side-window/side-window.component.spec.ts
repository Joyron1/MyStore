import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideWindowComponent } from './side-window.component';

describe('SideWindowComponent', () => {
  let component: SideWindowComponent;
  let fixture: ComponentFixture<SideWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
