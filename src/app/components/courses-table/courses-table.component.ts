import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CourseService } from "src/app/services/course.service";
import { RefreshService } from "src/app/services/refresh.service";
import swal from 'sweetalert';

@Component({
  selector: "app-courses-table",
  templateUrl: "./courses-table.component.html",
  styleUrls: ["./courses-table.component.css"],
})
export class CoursesTableComponent implements OnInit, OnDestroy {
  coursesTab: any;
  displayedColumns: string[] = ['name', 'description', 'period', 'createdBy', 'actions'];
  dataSource:any;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  private subscription : Subscription;
  constructor(private cService: CourseService, private router: Router, private refreshService:RefreshService) {
    this.subscription = this.refreshService.deleteButtonClicked$.subscribe(()=>{
      this.reloadData();
    })
  }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.cService.getAllCourses().subscribe((data) => {
      console.log(data);
      this.coursesTab = data.courses;
      this.dataSource = new MatTableDataSource(this.coursesTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.paginator);
      
    });
  }
  display(id) {
    this.router.navigate([`course/assigned-students/${id}`]);
  }
  editCourse(id) {
    this.router.navigate([`edit-course/${id}`]);
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
          this.reloadData();
          this.refreshService.emitDeleteButtonClick();
          swal("Deleted successfully!", {
            icon: "success",
          });
        });
      } else {
        swal("Canceled");
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
