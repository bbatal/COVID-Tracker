import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCasesComponent } from './world-cases.component';

describe('WorldCasesComponent', () => {
  let component: WorldCasesComponent;
  let fixture: ComponentFixture<WorldCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
