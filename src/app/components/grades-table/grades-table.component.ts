import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GradeService } from 'src/app/services/grade.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import swal from 'sweetalert';

@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.css']
})
export class GradesTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['evaluation', 'note', 'createdBy', 'assignedTo', 'forCourse', 'actions'];
  gradesTab:any;
  dataSource:any;
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  private subscription: Subscription;
  constructor(private gradeService:GradeService, private refreshService:RefreshService) { 
    this.subscription = this.refreshService.deleteButtonClicked$.subscribe(()=>{
      this.reloadData();
    })
  }

  ngOnInit() {
    this.reloadData();
  }
  
  reloadData(){
    this.gradeService.getAllGrades().subscribe((data)=>{
      console.log(data);
      this.gradesTab = data.grades;
      this.dataSource = new MatTableDataSource(this.gradesTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  delete(id){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this grade",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.gradeService.deleteGrade(id).subscribe((data)=> {
          console.log(data);
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
