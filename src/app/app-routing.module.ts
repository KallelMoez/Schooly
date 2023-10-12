import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
// import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
// import { SignupStudentComponent } from './components/signup-student/signup-student.component';
// import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AssignStudentsComponent } from './components/assign-students/assign-students.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditParentComponent } from './components/edit-parent/edit-parent.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { CourseInfoStudentComponent } from './components/course-info-student/course-info-student.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "signup/teacher", component: RegistrationFormComponent, data: {role: "teacher"}},
  {path: "signup/student", component: RegistrationFormComponent, data: {role: "student"}},
  {path: "signup/parent", component: RegistrationFormComponent, data: {role: "parent"}},
  {path: "courses", component: CoursesComponent},
  {path: "teachers", component: TeachersComponent},
  {path: "add-course", component: AddCourseComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["teacher"]}},
  {path: "teacher-dashboard", component: TeacherDashboardComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["teacher"]}},
  {path: "edit-course/:id", component: EditCourseComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["teacher", "admin"]}},
  {path: "course/assigned-students/:id", component: CourseInfoComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["teacher", "admin"]}},
  {path: "admin-dashboard", component: AdminDashboardComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin"]}},
  {path: "assign-course/:id", component: AssignStudentsComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin"]}},
  {path: "edit-teacher/:id", component: EditTeacherComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin"]}},
  {path: "edit-student/:id", component: EditStudentComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin"]}},
  {path: "edit-parent/:id", component: EditParentComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin"]}},
  {path: "student/:studentId/course/:courseId", component: AddGradeComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["teacher"]}},
  {path: "student-dashboard", component: StudentDashboardComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["student"]}},
  {path: "child-dashboard", component: StudentDashboardComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["parent"]}},
  {path: "course-info-student/:id", component: CourseInfoStudentComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["student", "parent"]}},
  {path: "search-teacher", component: SearchTeacherComponent, canActivate:[AuthGuardService], data:{expectedRoles: ["admin","parent","teacher","student"]}},
  {path: "*-qsdklqnsdqdsmk!dqsmklj+signup-admin", component: SignupAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
