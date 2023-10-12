import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { CourseService } from "src/app/services/course.service";
import swal from 'sweetalert'

@Component({
  selector: "app-teacher-dashboard",
  templateUrl: "./teacher-dashboard.component.html",
  styleUrls: ["./teacher-dashboard.component.css"],
})
export class TeacherDashboardComponent implements OnInit {
  displayedColumns:string[] = ["name", "description", "period", "actions"];
  coursesTab: any = [];
  decodedToken: any;
  dataSource:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router: Router, private cService: CourseService) {}

  ngOnInit() {
    let token: any = sessionStorage.getItem("token");
    this.decodedToken = decodeToken(token);
    console.log(this.decodedToken);
    this.dataReload();
  }
  dataReload() {
    this.cService
      .getCourseByTeacherId(this.decodedToken.id)
      .subscribe((data) => {
        console.log(data);
        this.coursesTab = data.courses;
        this.dataSource = new MatTableDataSource(this.coursesTab);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  displayCourse(id) {
    this.router.navigate([`course/assigned-students/${id}`]);
  }
  deleteCourse(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this course",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.cService.removeCourse(id).subscribe((data) => {
          console.log(data.msg);
          this.dataReload();
          swal("Deleted successfully!", {
            icon: "success",
          });
        });
      } else {
        swal("Canceled");
      }
    });
  }
  updateCourse(id) {
    this.router.navigate([`edit-course/${id}`]);
  }
}
