import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { RefreshService } from "src/app/services/refresh.service";
import { UserService } from "src/app/services/user.service";
import swal from "sweetalert";

@Component({
  selector: "app-teachers-table",
  templateUrl: "./teachers-table.component.html",
  styleUrls: ["./teachers-table.component.css"],
})
export class TeachersTableComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "tel",
    "actions",
  ];
  teachersTab: any = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private userService: UserService,
    private router: Router,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.dataReload();
  }
  dataReload() {
    this.userService.getUsersByRole("teacher").subscribe((data) => {
      console.log(data);
      this.teachersTab = data.users;
      this.dataSource = new MatTableDataSource(this.teachersTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  validateTeacher(id, name:string) {
    this.userService.teacherValidation(id).subscribe((data) => {
      console.log(data.msg);
      this.dataReload();
      swal("Success!", `${name} has been validated!`, "success");
    });
  }
  deleteTeacher(id) {
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
          this.dataReload();
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
  updateTeacher(id) {
    this.router.navigate([`edit-teacher/${id}`]);
  }
  openPdf(pdfUrl: string) {
    window.open(pdfUrl, "_blank");
  }
}
