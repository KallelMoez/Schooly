import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInfoStudentComponent } from './course-info-student.component';

describe('CourseInfoStudentComponent', () => {
  let component: CourseInfoStudentComponent;
  let fixture: ComponentFixture<CourseInfoStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInfoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInfoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
