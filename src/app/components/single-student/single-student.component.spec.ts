import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStudentComponent } from './single-student.component';

describe('SingleStudentComponent', () => {
  let component: SingleStudentComponent;
  let fixture: ComponentFixture<SingleStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
