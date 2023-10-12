import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { PageBannerComponent } from "./components/page-banner/page-banner.component";
import { SignupTeacherComponent } from "./components/signup-teacher/signup-teacher.component";
import { SignupStudentComponent } from "./components/signup-student/signup-student.component";
import { SignupParentComponent } from "./components/signup-parent/signup-parent.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { SingleCourseComponent } from "./components/single-course/single-course.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { SingleTeacherComponent } from "./components/single-teacher/single-teacher.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SingleStudentComponent } from './components/single-student/single-student.component';
import { AssignStudentsComponent } from './components/assign-students/assign-students.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditParentComponent } from './components/edit-parent/edit-parent.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { CourseInfoStudentComponent } from './components/course-info-student/course-info-student.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { GradesTableComponent } from './components/grades-table/grades-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTabsModule } from "@angular/material";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent,
    PageBannerComponent,
    SignupTeacherComponent,
    SignupStudentComponent,
    SignupParentComponent,
    CoursesComponent,
    SingleCourseComponent,
    TeachersComponent,
    SingleTeacherComponent,
    RegistrationFormComponent,
    AddCourseComponent,
    TeacherDashboardComponent,
    EditCourseComponent,
    CourseInfoComponent,
    AdminDashboardComponent,
    TeachersTableComponent,
    StudentsTableComponent,
    ParentsTableComponent,
    CoursesTableComponent,
    SingleStudentComponent,
    AssignStudentsComponent,
    EditTeacherComponent,
    EditStudentComponent,
    EditParentComponent,
    AddGradeComponent,
    StudentDashboardComponent,
    CourseInfoStudentComponent,
    SearchTeacherComponent,
    SignupAdminComponent,
    GradesTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
