import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import swal from 'sweetalert';

@Component({
  selector: "app-parents-table",
  templateUrl: "./parents-table.component.html",
  styleUrls: ["./parents-table.component.css"],
})
export class ParentsTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'tel','child', 'actions'];
  dataSource:any;
  parentsTab: any = [];
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.userService.getUsersByRole("parent").subscribe((data) => {
      console.log(data);
      this.parentsTab = data.users;
      this.dataSource = new MatTableDataSource(this.parentsTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  updateParent(id) {
    this.router.navigate([`edit-parent/${id}`]);
  }
  deleteParent(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.userService.deleteUser(id).subscribe((data) => {
          console.log(data.msg);
          this.reloadData();
          swal("Deleted successfully!", {
            icon: "success",
          });
        });
      } else {
        swal("Canceled");
      }
    });
    
  }
}
