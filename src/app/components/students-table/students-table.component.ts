import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { RefreshService } from "src/app/services/refresh.service";
import { UserService } from "src/app/services/user.service";
import swal from "sweetalert";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.css"],
})
export class StudentsTableComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "tel",
    "actions",
  ];
  dataSource: any;
  studentsTab: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private userService: UserService,
    private router: Router,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.userService.getUsersByRole("student").subscribe((data) => {
      console.log(data);
      this.studentsTab = data.users;
      this.dataSource = new MatTableDataSource(this.studentsTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  assignCourse(id) {
    this.router.navigate([`assign-course/${id}`]);
  }
  deleteStudent(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.userService.deleteUser(id).subscribe((data) => {
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
  updateStudent(id) {
    this.router.navigate([`edit-student/${id}`]);
  }
}
